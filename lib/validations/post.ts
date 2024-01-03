"use client";

import * as z from "zod";

export const PostValidation = z.object({
  postText: z
    .string()
    .min(3, { message: "Minimum 3 characters required." })
    .max(400, { message: "Maximum 400 characters allowed." }),
});

export const CommentValidation = z.object({
  postText: z
    .string()
    .min(3, { message: "Minimum 3 characters required." })
    .max(200, { message: "Maximum 200 characters allowed." }),
});

export const ImagePostValidation = z.object({
  image: z
    .string()
    .url({ message: "No file selected." })
    .min(1, { message: "No file selected." }),
  caption: z
    .string()
    .min(0, { message: "Minimum 3 characters required." })
    .max(50, { message: "Maximum 50 characters allowed." }),
});
