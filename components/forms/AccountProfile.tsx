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
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { updateUser } from "@/lib/actions/user.actions";
import { FaHome, FaUser, FaAt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
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

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    link: string;
    location: string;
    email: string;
  };
  btnTitle: string;
  heading: string;
}

const AccountProfile = ({ user, btnTitle, heading }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [success, setSuccess] = useState<Boolean>(false);

  const { startUpload } = useUploadThing("media");

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      username: user?.username || "",
      name: user?.name || "",
      bio: user?.bio || "",
      profile_photo: user?.image || "",
      link: user?.link || "",
      location: user?.location || "",
      email: user?.email,
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
  async function onSubmit(values: z.infer<typeof UserValidation>) {
    setIsLoading(true);

    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgResponse = await startUpload(files);
      if (imgResponse && imgResponse[0].url) {
        values.profile_photo = imgResponse[0].url;
      }
    }

    // update user profile
    await updateUser({
      userId: user.id,
      username: user?.username || values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname,
      link: values.link,
      location: values.location,
      email: values.email,
    });

    setIsLoading(false);
    setSuccess(true);

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        {heading.length > 1 && <h1 className={styles.heading}>{heading}</h1>}

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
                    disabled={isLoading === true}
                  />
                </FormControl>
              </div>

              <FormMessage className={styles.errorMessage} />
            </FormItem>
          )}
        />
        <div className={styles.flexItems}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className={styles.field}>
                <FormLabel className={styles.label}>Name*</FormLabel>
                <div className={styles.linkInput}>
                  <span className={styles.http}>
                    <FaUser />
                  </span>
                  <FormControl>
                    <Input
                      className={styles.link}
                      placeholder="Enter your full name."
                      {...field}
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
            name="username"
            render={({ field }) => (
              <FormItem className={styles.field}>
                <FormLabel className={styles.label}>Username*</FormLabel>
                <div className={styles.linkInput}>
                  <span className={styles.http}>
                    <FaAt />
                  </span>
                  <FormControl>
                    <Input
                      className={`${styles.link} ${styles.disabled}`}
                      placeholder="Enter a username. (Spaces ( ) and preiods (.) not allowed."
                      {...field}
                      disabled
                    />
                  </FormControl>
                </div>
                <FormMessage className={styles.errorMessage} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={styles.field}>
                <FormLabel className={styles.label}>Email ID*</FormLabel>
                <div className={styles.linkInput}>
                  <span className={styles.http}>
                    <IoMdMail />
                  </span>
                  <FormControl>
                    <Input
                      className={`${styles.link} ${styles.disabled}`}
                      placeholder="Enter Email ID."
                      {...field}
                      disabled
                    />
                  </FormControl>
                </div>
                <FormMessage className={styles.errorMessage} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className={styles.field}>
                <FormLabel className={styles.label}>Location</FormLabel>
                <div className={styles.linkInput}>
                  <span className={styles.http}>
                    <FaHome />
                  </span>
                  <FormControl>
                    <Input
                      className={styles.link}
                      placeholder="Ex. Bangalore, KA, India"
                      {...field}
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
            name="link"
            render={({ field }) => (
              <FormItem className={styles.field}>
                <FormLabel className={styles.label}>Link</FormLabel>
                <div className={styles.linkInput}>
                  <span className={`${styles.http} ${styles.bold}`}>
                    https://
                  </span>
                  <FormControl>
                    <Input
                      className={styles.link}
                      placeholder="example.com/profile"
                      {...field}
                      disabled={isLoading === true}
                    />
                  </FormControl>
                </div>
                <FormMessage className={styles.errorMessage} />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className={styles.field}>
              <FormLabel className={styles.label}>Bio*</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Who are you (in 1000 characters or less)?"
                  {...field}
                  disabled={isLoading === true}
                />
              </FormControl>
              <FormMessage className={styles.errorMessage} />
            </FormItem>
          )}
        />
        <FormDescription className={styles.description}>
          Feilds marked * are mandatory. By submiting the form, you agree to the
          terms and conditions at Komyuniti.
        </FormDescription>
        <Box sx={{ position: "relative" }}>
          <Button
            className={`${styles.submitButton}  ${
              isLoading ? styles.loading : ""
            } ${success ? styles.success : ""}`}
            disabled={isLoading === true}
            type="submit"
          >
            {!success ? btnTitle : "Success ✅"}
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

export default AccountProfile;
