"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createPost({ text, author, communityId, path }: Params) {
  connectToDB();
  //   const cre;

  try {
  } catch (e: any) {
    throw new Error("Failer to create/update new user. Ye dekho", e);
  }
}
