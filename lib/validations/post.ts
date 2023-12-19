"use client";

import * as z from "zod";

export const PostValidation = z.object({
  postText: z
    .string()
    .min(3, { message: "Minimum 3 characters required." })
    .max(500, { message: "Maximum 500 characters allowed." }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  postText: z
    .string()
    .min(3, { message: "Minimum 3 characters required." })
    .max(500, { message: "Maximum 500 characters allowed." }),
});
