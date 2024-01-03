"use client";

import * as z from "zod";

export const CommunityValidation = z.object({
  header_image: z
    .string()
    .url({ message: "No file selected." })
    .min(1, { message: "No file selected." }),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters required." })
    .max(50, { message: "Maximum 50 characters allowed." }),
  bio: z
    .string()
    .min(1, { message: "Bio cannot be left empty.." })
    .max(1000, { message: "Maximum 1000 characters allowed." }),
  link: z
    .string()
    .min(0, { message: "Minimum 3 characters required." })
    .max(50, { message: "Maximum 50 characters allowed." }),
  theme: z
    .string()
    .min(0, { message: "Minimum 3 characters required." })
    .max(50, { message: "Maximum 50 characters allowed." }),
});
