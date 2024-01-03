"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import Community from "../models/community.model";
import User from "../models/user.model";

export async function createCommunity({
  communityId,
  name,
  bio,
  header_image,
  path,
  link,
  userId,
  mongoId,
  themeColor,
}: {
  communityId: string;
  header_image: string;
  name: string;
  bio: string;
  path: string;
  link: string;
  userId: string;
  mongoId: any;
  themeColor: string;
}): Promise<void> {
  connectToDB();

  try {
    const user = await User.findOne({ id: userId });

    if (!user) {
      throw new Error("User not found"); // Handle the case if the user with the id is not found
    }

    const newCommunity = new Community({
      name: name,
      header_image: header_image,
      bio: bio,
      link: link,
      admins: mongoId,
      members: mongoId,
      themeColor: themeColor,
    });

    const createdCommunity = await newCommunity.save();

    user.communities.push(createdCommunity._id);
    await user.save();

    revalidatePath(path);
  } catch (e: any) {
    throw new Error("Failer to create/update community. Ye dekho", e.message);
  }
}
