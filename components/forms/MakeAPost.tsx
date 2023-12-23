"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import styles from "./MakeAPost.module.css";
import Image from "next/image";
import camera from "../../public/images/camera.svg";
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
import { PostValidation } from "@/lib/validations/post";
import { createPost } from "@/lib/actions/post.actions";

const MakeAPost = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      postText: "",
      accountId: userId,
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    await createPost({
      text: values.postText,
      author: values.accountId,
      communityId: null,
      path: pathname,
    });

    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <FormField
          control={form.control}
          name="postText"
          render={({ field }) => (
            <FormItem className={styles.field}>
              {/* <FormLabel className={styles.label}>Bio</FormLabel> */}
              <FormControl>
                <Textarea
                  className={styles.input}
                  rows={10}
                  placeholder="Speak Your Mind!"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage className={styles.errorMessage} />
            </FormItem>
          )}
        />
        <FormDescription className={styles.description}>
          Please ensure that your post respects the feelings and opinions of
          others on the Komyuniti App, and adhere to our community guidelines.
        </FormDescription>
        <Button className={styles.submitButton} type="submit">
          Share ✅
        </Button>
      </form>
    </Form>
  );
};

export default MakeAPost;
