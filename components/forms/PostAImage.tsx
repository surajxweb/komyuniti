"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import styles from "./PostAImage.module.css";
import Image from "next/image";
import camera from "../../public/images/image_placeholder.svg";
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/lib/utils";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImagePostValidation } from "@/lib/validations/post";
import { Textarea } from "../ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { postAImage } from "@/lib/actions/post.actions";

const PostAImage = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [success, setSuccess] = useState<Boolean>(false);

  const { startUpload } = useUploadThing("media");

  const form = useForm({
    resolver: zodResolver(ImagePostValidation),
    defaultValues: {
      caption: "",
      image: "",
    },
  });

  //image handeller

  function handleImage(
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  }

  //submit handler.
  async function onSubmit(values: z.infer<typeof ImagePostValidation>) {
    setIsLoading(true);

    const blob = values.image;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgResponse = await startUpload(files);
      if (imgResponse && imgResponse[0].url) {
        values.image = imgResponse[0].url;
      }
    }

    const userInfo = await fetchUser(userId || "");
    const userKaId = userInfo._id.toString();

    await postAImage({
      text: values.caption,
      image: values.image,
      author: userKaId,
      communityId: null,
      path: pathname,
    });

    router.push("/");

    setIsLoading(false);
    setSuccess(true);

    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className={styles.field}>
              <div className={styles.reanderPhoto}>
                {field.value ? (
                  <Image
                    src={field.value}
                    height={400}
                    width={400}
                    alt="timeline image"
                  />
                ) : (
                  <Image
                    src={camera}
                    height={400}
                    width={400}
                    alt="profile photo"
                  />
                )}
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImage(e, field.onChange)}
                    className={styles.fileInput}
                    disabled={isLoading === true}
                  />
                </FormControl>
              </div>
              <FormMessage className={styles.errorMessage} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem className={styles.field}>
              <FormControl>
                <Textarea
                  className={styles.input}
                  rows={4}
                  placeholder="Write an optional caption!"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage className={styles.errorMessage} />
            </FormItem>
          )}
        />
        <FormDescription className={styles.description}>
          Please ensure that your image and caption respects the feelings and
          opinions of others on the Komyuniti App, and adhere to our community
          guidelines.
        </FormDescription>
        <Box sx={{ position: "relative" }}>
          <Button
            className={`${styles.submitButton}  ${
              isLoading ? styles.loading : ""
            } ${success ? styles.success : ""}`}
            disabled={isLoading === true}
            type="submit"
          >
            {!success ? "Post" : "Success ✅"}
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </form>
    </Form>
  );
};

export default PostAImage;
