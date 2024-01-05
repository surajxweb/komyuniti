"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import Community from "../models/community.model";
import User from "../models/user.model";
import { FilterQuery, SortOrder } from "mongoose";

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

export async function fetchCommunityWithHighestV() {
  try {
    connectToDB();

    // Define the sort options for fetching users based on the __v field in descending order.
    const sortOptions: { __v: SortOrder } = { __v: -1 };

    // Use the limit method to fetch only 5 users.
    const communities = await Community.find()
      .sort(sortOptions)
      .limit(5)
      .exec();

    return communities;
  } catch (error: any) {
    console.error("Error fetching users with highest __v:", error.message);
    throw error;
  }
}

export async function fetchCommunity(id: string) {
  try {
    connectToDB();
    return await Community.findById(id);
  } catch (e: any) {}
}

export async function fetchCommunities({
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // Calculate the number of communities to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter communities.
    const query: FilterQuery<typeof Community> = {};

    // If the search string is not empty, add the $regex operator to match the name field.
    if (searchString.trim() !== "") {
      query.name = { $regex: regex };
    }

    // Define the sort options for the fetched communities based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    const communitiesQuery = Community.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // Count the total number of communities that match the search criteria (without pagination).
    const totalCommunitiesCount = await Community.countDocuments(query);

    const communities = await communitiesQuery.exec();

    // Check if there are more communities beyond the current page.
    const isNext = totalCommunitiesCount > skipAmount + communities.length;

    return { communities, isNext };
  } catch (error) {
    console.error("Error fetching communities:", error);
    throw error;
  }
}
