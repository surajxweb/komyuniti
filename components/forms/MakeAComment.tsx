"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import styles from "./MakeAComment.module.css";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { updateUser } from "@/lib/actions/user.actions";
import { CommentValidation } from "@/lib/validations/post";
import { addCommentToPost, createPost } from "@/lib/actions/post.actions";

interface Props {
  postId: string;
  currentUserImage: string;
  currentUserId: string;
}

const MakeAComment = ({ postId, currentUserImage, currentUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      postText: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    await addCommentToPost({
      postId: postId,
      commentText: values.postText,
      userId: currentUserId,
      path: pathname,
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <FormField
          control={form.control}
          name="postText"
          render={({ field }) => (
            <FormItem className={styles.field}>
              <FormLabel className={styles.label}>
                <Image
                  src={currentUserImage}
                  alt="current user profile picture"
                  height={50}
                  width={50}
                />
              </FormLabel>
              <FormControl>
                <Input
                  className={styles.input}
                  placeholder="Drop a comment"
                  {...field}
                />
              </FormControl>
              <FormMessage
                className={`${styles.errorMessage} ${styles.fullWidth}`}
              />
            </FormItem>
          )}
        />

        <Button className={styles.submitButton} type="submit">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default MakeAComment;
