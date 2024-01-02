"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Post from "../models/post.model";
import { FilterQuery, SortOrder } from "mongoose";

export async function createUser({
  id,
  name,
  image,
  email,
  username,
}: {
  id: string;
  name: string;
  image: string;
  email: string;
  username: string;
}) {
  try {
    connectToDB();

    await User.create({
      id: id,
      username: username,
      name: name,
      image: image,
      emailOfUser: email,
      onboarded: false,
    });
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

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
      options: { sort: { createdAt: -1 } },
      select:
        "_id text community createdAt parentId children postType likes isEdited",
    }).populate({
      path: "likedPosts",
      model: Post,
      options: { sort: { createdAt: -1 } },
      select:
        "_id text community createdAt parentId children postType likes isEdited",
    });
    // .populate({ path: "communities", model: Community})
  } catch (e: any) {
    throw new Error("User nahi mila, ye dekho: ", e);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter users.
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }, // Exclude the current user from the results.
    };

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // Count the total number of users that match the search criteria (without pagination).
    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    // Check if there are more users beyond the current page.
    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getActivity({ userId }: { userId: string }) {
  try {
    connectToDB();
  } catch (e: any) {
    throw new Error("Failed to fetch activity. Ye dekho : ", e.message);
  }
}
