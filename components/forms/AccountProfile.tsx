"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import styles from "./AccountProfile.module.css";
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
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { updateUser } from "@/lib/actions/user.actions";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      username: user?.username || "",
      name: user?.name || "",
      bio: user?.bio || "",
      profile_photo: user?.image || "",
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

      // if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  }

  //submit handler.
  async function onSubmit(values: z.infer<typeof UserValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgResponse = await startUpload(files);
      if (imgResponse && imgResponse[0].fileUrl) {
        values.profile_photo = imgResponse[0].fileUrl;
      }
    }

    console.log("submit ke time ka username: ", values.username);

    // update user profile
    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.heading}>Let&#39;s set you up!</h2>

        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className={styles.field}>
              <FormLabel className={styles.label}>
                Upload a nice looking picture of yourself.
              </FormLabel>
              <div className={styles.reanderPhoto}>
                {field.value ? (
                  <Image
                    src={field.value}
                    height={90}
                    width={90}
                    alt="profile photo"
                  />
                ) : (
                  <Image
                    src={camera}
                    height={90}
                    width={90}
                    alt="profile photo"
                  />
                )}
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload a photo"
                    onChange={(e) => handleImage(e, field.onChange)}
                    className={styles.fileInput}
                  />
                </FormControl>
              </div>

              <FormMessage className={styles.errorMessage} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={styles.field}>
              <FormLabel className={styles.label}>Name</FormLabel>
              <FormControl>
                <Input
                  className={styles.input}
                  placeholder="Enter your full name."
                  {...field}
                />
              </FormControl>
              <FormMessage className={styles.errorMessage} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className={styles.field}>
              <FormLabel className={styles.label}>Username</FormLabel>
              <FormControl>
                <Input
                  className={styles.input}
                  placeholder="Enter a username. (Spaces ( ) and preiods (.) not allowed."
                  {...field}
                />
              </FormControl>
              <FormMessage className={styles.errorMessage} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className={styles.field}>
              <FormLabel className={styles.label}>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className={styles.input}
                  rows={6}
                  placeholder="Who are you (in 1000 characters or less)?"
                  {...field}
                />
              </FormControl>
              <FormMessage className={styles.errorMessage} />
            </FormItem>
          )}
        />
        <FormDescription className={styles.description}>
          The information entered here is permanent, until we implement the edit
          functionality.
        </FormDescription>
        <Button className={styles.submitButton} type="submit">
          {btnTitle} ✅
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
