"use client";

import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z
    .string()
    .url({ message: "No file selected." })
    .min(1, { message: "No file selected." }),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters required." })
    .max(50, { message: "Maximum 50 characters allowed." }),
  email: z
    .string()
    .min(3, { message: "Minimum 3 characters required." })
    .max(100, { message: "Maximum 100 characters allowed." }),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters required." })
    .max(30, { message: "Maximum 30 characters allowed." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Only letters, numbers, and underscores are allowed in the username.",
    }),
  bio: z
    .string()
    .min(1, { message: "Bio cannot be left empty.." })
    .max(1000, { message: "Maximum 1000 characters allowed." }),
  link: z
    .string()
    .min(0, { message: "Minimum 3 characters required." })
    .max(50, { message: "Maximum 50 characters allowed." }),
  location: z
    .string()
    .min(0, { message: "Minimum 3 characters required." })
    .max(50, { message: "Maximum 50 characters allowed." }),
});
