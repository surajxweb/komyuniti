"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Post from "../models/post.model";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
  link: string;
  location: string;
  email: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
  link,
  location,
  email,
}: Params): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        username: username.toLowerCase(),
        name: name,
        bio: bio,
        image: image,
        link: link,
        onboarded: true,
        termsOfServiceAgreed: true,
        locationOfUser: location,
        emailOfUser: email,
      },
      {
        upsert: true,
      }
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (e: any) {
    throw new Error("Failer to create/update new user. Ye dekho", e);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();
    return await User.findOne({ id: userId });
    // .populate({ path: "communities", model: Community})
  } catch (e: any) {
    throw new Error("User nahi mila, ye dekho: ", e);
  }
}

export async function fetchProfilePageDetails(username: string) {
  try {
    connectToDB();
    return await User.findOne({ username: username }).populate({
      path: "posts",
      model: Post,
      select:
        "_id text community createdAt parentId children postType likes isEdited",
    });
    // .populate({ path: "communities", model: Community})
  } catch (e: any) {
    throw new Error("User nahi mila, ye dekho: ", e);
  }
}
