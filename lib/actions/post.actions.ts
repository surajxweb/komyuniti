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
    console.log("Nahi mila koi post, ye dekho: ", error);
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
    console.log("Nahi mila iss bande ka post, ye dekho: ", error);
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
    console.log("Nahi mila koi post, ye dekho: ", error);
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
}: {
  postId: string;
  userId: string;
  voteOption: number;
}) {
  console.log("Lets start casting vote!");
  console.log("Post Id: ", postId);
  console.log("User Id: ", userId);
  console.log("Voilence: ", voteOption);

  try {
    connectToDB();

    const foundPost = await Post.findById(postId);
    if (!foundPost) {
      throw new Error(`Post with ID ${postId} not found!`);
    }

    console.log("ye dekho kaun mila: ", foundPost);

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
  } catch (e: any) {
    throw new Error("Voting failed like elections in UP lol. " + e.message);
  }
}
