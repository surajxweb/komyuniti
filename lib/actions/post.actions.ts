"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Post from "../models/post.model";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createPost({ text, author, communityId, path }: Params) {
  try {
    connectToDB();

    const createdPost = await Post.create({
      text,
      author,
      community: communityId || null,
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { posts: createdPost._id },
    });

    revalidatePath(path);
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
}

export async function postAImage({
  text,
  image,
  author,
  communityId,
  path,
}: {
  text: string;
  image: string;
  author: string;
  communityId: string | null;
  path: string;
}) {
  try {
    connectToDB();

    const createdPost = await Post.create({
      text,
      author,
      postType: "image",
      media: image,
      community: communityId || null,
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { posts: createdPost._id },
    });

    revalidatePath(path);
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
}

export async function postAPoll({
  author,
  question,
  option1,
  option2,
  option3,
  option4,
  communityId,
  path,
}: {
  author: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  communityId?: string | null;
  path: string;
}) {
  try {
    connectToDB();

    const createdPost = await Post.create({
      text: question,
      author: author,
      postType: "poll",
      options: {
        option1: {
          text: option1,
          votes: [],
        },
        option2: {
          text: option2,
          votes: [],
        },
        option3: {
          text: option3,
          votes: [],
        },
        option4: {
          text: option4,
          votes: [],
        },
      },
      community: communityId || null,
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { posts: createdPost._id },
    });

    revalidatePath(path);
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
}

export async function fetchPosts() {
  try {
    connectToDB();

    // orphan posts
    return await Post.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .populate({
        path: "author",
        model: User,
        select: "_id id name username image",
      });
  } catch (error: any) {
    throw new Error("Nahi mila koi post, ye dekho: ", error);
  }
}

export async function findPostById(id: string) {
  try {
    connectToDB();

    return await Post.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name username image",
      })
      .populate({
        path: "children",
        options: { sort: { createdAt: -1 } }, // sort in descending order
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name username image",
          },
          {
            path: "likes",
            model: User,
            select: "name username",
          },
          {
            path: "children",
            model: Post,

            populate: [
              {
                path: "author",
                model: User,
                select: "_id id name username image",
              },
              {
                path: "likes",
                model: User,
                select: "name username",
              },
              // Add any other population configurations if needed
            ],
          },
        ],
      })
      .populate({
        path: "likes",
        model: User,
        select: "name username",
      });
  } catch (error: any) {
    throw new Error("Nahi mila iss bande ka post, ye dekho: ", error);
  }
}

export async function addCommentToPost({
  postId,
  commentText,
  userId,
  path,
}: {
  postId: string;
  commentText: string;
  userId: string;
  path: string;
}) {
  try {
    connectToDB();

    // adding comment
    const parentPost = await Post.findById(postId);
    if (!parentPost) throw new Error("Parent Post Not Found!");

    const commentPost = new Post({
      text: commentText,
      author: userId,
      parentId: postId,
    });

    // save the post

    const savedCommentPost = await commentPost.save();

    parentPost.children.push(savedCommentPost._id);

    await parentPost.save();

    revalidatePath(path);
  } catch (e: any) {
    throw new Error("Failed to add comment, ye dekho: ", e);
  }
}

export async function fetchPostsByUserId({ id }: { id: string }) {
  try {
    connectToDB();

    // orphan posts
    return await Post.find({
      parentId: { $in: [null, undefined] },
      "author.id": id,
    }).sort({ createdAt: "desc" });
  } catch (error: any) {
    throw new Error("Nahi mila koi post, ye dekho: ", error);
  }
}

export async function likeAPost({
  postId,
  userId,
  path,
}: {
  postId: string;
  userId: string;
  path: string;
}) {
  try {
    connectToDB();

    const foundPost = await Post.findById(postId);
    if (!foundPost) {
      throw new Error(`Post with ID ${postId} not found!`);
    }

    foundPost.likes.push(userId);
    await foundPost.save();

    const userLikingThePost = await User.findById(userId);
    if (!userLikingThePost) {
      throw new Error(`User with ID ${userId} not found!`);
    }

    userLikingThePost.likedPosts.push(postId);
    await userLikingThePost.save();

    revalidatePath(path);
  } catch (e: any) {
    throw new Error("Nahi hua like :(");
  }
}

export async function unlikeAPost({
  postId,
  userId,
  path,
}: {
  postId: string;
  userId: string;
  path: string;
}) {
  try {
    connectToDB();

    const foundPost = await Post.findById(postId);
    if (!foundPost) {
      throw new Error(`Post with ID ${postId} not found!`);
    }

    // Remove the userId from the likes array
    foundPost.likes.pull(userId);
    await foundPost.save();

    const userUnLikingThePost = await User.findById(userId);
    if (!userUnLikingThePost) {
      throw new Error(`User with ID ${userId} not found!`);
    }

    // Remove the postId from the likedPosts array
    userUnLikingThePost.likedPosts.pull(postId);
    await userUnLikingThePost.save();

    revalidatePath(path);
  } catch (e: any) {
    throw new Error("Nahi hua unlike :(");
  }
}

export async function castAVote({
  postId,
  userId,
  voteOption,
  pathname,
}: {
  postId: string;
  userId: string;
  voteOption: number;
  pathname: string;
}) {
  try {
    connectToDB();

    const foundPost = await Post.findById(postId);
    if (!foundPost) {
      throw new Error(`Post with ID ${postId} not found!`);
    }

    switch (voteOption) {
      case 1:
        foundPost.options.option1.votes.push(userId);
        break;
      case 2:
        foundPost.options.option2.votes.push(userId);
        break;
      case 3:
        foundPost.options.option3.votes.push(userId);
        break;
      case 4:
        foundPost.options.option4.votes.push(userId);
        break;
      default:
        throw new Error("Invalid vote option!");
    }

    // Save the changes
    await foundPost.save();
    revalidatePath(pathname);
  } catch (e: any) {
    throw new Error("Voting failed like elections in UP lol. " + e.message);
  }
}

export async function deleteAPost({
  postId,
  path,
}: {
  postId: string;
  path: string;
}) {
  try {
    connectToDB();

    // Find the post to be deleted
    const postToDelete = await Post.findById(postId);
    if (!postToDelete) {
      throw new Error(`Post with ID ${postId} not found!`);
    }

    // Delete all the children (comments) of the post
    if (postToDelete.children.length > 0) {
      await Post.deleteMany({ _id: { $in: postToDelete.children } });
    }

    // If the post has a parent, remove the post from its parent's children array
    if (postToDelete.parentId) {
      const parentPost = await Post.findById(postToDelete.parentId);
      if (parentPost) {
        parentPost.children.pull(postId);
        await parentPost.save();
      }
    }

    // Remove post ID from likedPosts array of users who liked the post
    for (const userId of postToDelete.likes) {
      const user = await User.findById(userId);
      if (user) {
        user.likedPosts.pull(postId);
        await user.save();
      }
    }

    // Remove post ID from the posts array of the author
    const authorId = postToDelete.author;
    const author = await User.findById(authorId);
    if (author) {
      author.posts.pull(postId);
      await author.save();
    }

    // Delete the post
    await Post.deleteOne({ _id: postId });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(
      `Failed to delete post  with ID ${postId}: ${error.message}`
    );
  }
}
