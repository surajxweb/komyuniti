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
import { createCommunity } from "@/lib/actions/community.actions";
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
import { CommunityValidation } from "@/lib/validations/community";

interface Props {
  userId: string;
  btnTitle: string;
  heading: string;
  communityName?: string | null | undefined;
  communityBio?: string | null | undefined;
  communityHeader?: string | null | undefined;
  communityId?: string | null | undefined;
  communityLink?: string | null | undefined;
  mongoId: any;
}
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const CommunityProfile = ({
  userId,
  btnTitle,
  communityName,
  communityBio,
  communityHeader,
  communityLink,
  communityId,
  heading,
  mongoId,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [success, setSuccess] = useState<Boolean>(false);
  const [themeColor, setThemeColor] = useState<string>("#586aea");

  const { startUpload } = useUploadThing("media");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeColor((event.target as HTMLInputElement).value);
  };

  const form = useForm({
    resolver: zodResolver(CommunityValidation),
    defaultValues: {
      name: communityName || "",
      bio: communityBio || "",
      header_image: communityHeader || "",
      link: communityLink || "",
      theme: "",
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
  async function onSubmit(values: z.infer<typeof CommunityValidation>) {
    setIsLoading(true);

    const blob = values.header_image;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgResponse = await startUpload(files);
      if (imgResponse && imgResponse[0].url) {
        values.header_image = imgResponse[0].url;
      }
    }

    // update community profile
    await createCommunity({
      communityId: communityId || "",
      userId: userId,
      path: pathname,
      name: values.name,
      bio: values.bio,
      header_image: values.header_image,
      link: values.link,
      mongoId: mongoId,
      themeColor: themeColor,
    });

    setIsLoading(false);
    setSuccess(true);

    if (pathname === "/communities/edit") {
      router.back();
    } else {
      router.push("/communities");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        {heading.length > 1 && <h1 className={styles.heading}>{heading}</h1>}

        <FormField
          control={form.control}
          name="header_image"
          render={({ field }) => (
            <FormItem className={styles.field}>
              <FormLabel className={styles.label}>
                Upload a header image for your new community.
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
                    placeholder="Upload a header image."
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
                <FormLabel className={styles.label}>Community Name*</FormLabel>
                <div className={styles.linkInput}>
                  <span className={styles.http}>
                    <FaUser />
                  </span>
                  <FormControl>
                    <Input
                      className={styles.link}
                      placeholder="Enter community name."
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

        <div className={styles.field}>
          <FormLabel className={styles.label}>Theme Color*</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={themeColor}
            onChange={handleColorChange}
          >
            <div className={styles.colorGroup}>
              <FormControlLabel
                value="#586aea"
                control={<Radio size="small" />}
                label="Periwinkle Blue"
              />
              <div
                style={{ backgroundColor: "#586aea" }}
                className={styles.colorPreview}
              ></div>
            </div>
            <div className={styles.colorGroup}>
              <FormControlLabel
                value="#FF6F61"
                control={<Radio size="small" />}
                label="Coral"
              />
              <div
                style={{ backgroundColor: "#FF6F61" }}
                className={styles.colorPreview}
              ></div>
            </div>
            <div className={styles.colorGroup}>
              <FormControlLabel
                value="#708090"
                control={<Radio size="small" />}
                label="Slate Grey"
              />
              <div
                style={{ backgroundColor: "#708090" }}
                className={styles.colorPreview}
              ></div>
            </div>
            <div className={styles.colorGroup}>
              <FormControlLabel
                value="#DAA520"
                control={<Radio size="small" />}
                label="Goldenrod "
              />
              <div
                style={{ backgroundColor: "#DAA520" }}
                className={styles.colorPreview}
              ></div>
            </div>
            <div className={styles.colorGroup}>
              <FormControlLabel
                value="#1E90FF"
                control={<Radio size="small" />}
                label="Dodger Blue"
              />
              <div
                style={{ backgroundColor: "#1E90FF" }}
                className={styles.colorPreview}
              ></div>
            </div>
          </RadioGroup>
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
                  placeholder="What is this community about (in 1000 characters or less)?"
                  {...field}
                  disabled={isLoading === true}
                />
              </FormControl>
              <FormMessage className={styles.errorMessage} />
            </FormItem>
          )}
        />

        <FormDescription className={styles.description}>
          Feilds marked * are mandatory.
        </FormDescription>
        <Box sx={{ m: 1, position: "relative" }}>
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

export default CommunityProfile;
