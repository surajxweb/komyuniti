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
      community: null,
    });

    console.log("");

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { posts: createdPost._id },
    });

    revalidatePath(path);
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
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parendId image",
        },
      })
      .populate({
        path: "likes",
        model: "User",
        select: "name username",
      });
  } catch (error: any) {
    console.log("Nahi mila koi post, ye dekho: ", error);
  }
}

export async function findPostById(id: string) {
  try {
    connectToDB();

    // orphan posts
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
            populate: {
              path: "author",
              model: User,
              select: "_id id name username image",
            },
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
    })
      .sort({ createdAt: "desc" })
      .populate({
        path: "author",
        model: User,
        select: "_id id name username image",
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parendId image",
        },
      })
      .populate({
        path: "likes",
        model: "User",
        select: "name username",
      });
  } catch (error: any) {
    console.log("Nahi mila koi post, ye dekho: ", error);
  }
}
