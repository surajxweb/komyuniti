import { usePathname, useRouter } from "next/navigation";
import { PollValidation } from "@/lib/validations/post";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import styles from "./PostAPoll.module.css";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postAPoll } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { useAuth } from "@clerk/nextjs";

const PostAPoll = () => {
  const { userId } = useAuth();
  const path = usePathname();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [success, setSuccess] = useState<Boolean>(false);

  const form = useForm({
    resolver: zodResolver(PollValidation),
    defaultValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PollValidation>) {
    setIsLoading(true);

    const userInfo = await fetchUser(userId || "");
    const userKaId = userInfo._id.toString();

    await postAPoll({
      author: userKaId,
      question: values.question,
      option1: values.option1,
      option2: values.option2,
      option3: values.option3,
      option4: values.option4,
      communityId: null,
      path: path,
    });

    setIsLoading(false);
    setSuccess(true);

    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={styles.label}>Ask the Community.</FormLabel>
              <FormControl>
                <Textarea
                  className={styles.input}
                  rows={4}
                  placeholder="Drop a question!"
                  autoFocus
                  {...field}
                  disabled={isLoading === true}
                />
              </FormControl>
              <FormMessage className={styles.errorMessage} />
            </FormItem>
          )}
        />
        <FormLabel className={styles.label}>Add Options.</FormLabel>

        <div className={styles.optionGroup}>
          <FormField
            control={form.control}
            name="option1"
            render={({ field }) => (
              <FormItem className={styles.field}>
                <FormControl>
                  <Input
                    className={styles.option}
                    placeholder="Add Option One"
                    {...field}
                    disabled={isLoading === true}
                  />
                </FormControl>
                <FormMessage className={styles.errorMessage} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="option2"
            render={({ field }) => (
              <FormItem className={styles.field}>
                <FormControl>
                  <Input
                    className={styles.option}
                    placeholder="Add Option Two"
                    {...field}
                    disabled={isLoading === true}
                  />
                </FormControl>
                <FormMessage className={styles.errorMessage} />
              </FormItem>
            )}
          />
        </div>

        <div className={styles.optionGroup}>
          <FormField
            control={form.control}
            name="option3"
            render={({ field }) => (
              <FormItem className={styles.field}>
                <FormControl>
                  <Input
                    className={styles.option}
                    placeholder="Add Option Three (Optional)"
                    {...field}
                    disabled={isLoading === true}
                  />
                </FormControl>
                <FormMessage className={styles.errorMessage} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="option4"
            render={({ field }) => (
              <FormItem className={styles.field}>
                <FormControl>
                  <Input
                    className={styles.option}
                    placeholder="Add Option Four (Optional)"
                    {...field}
                    disabled={isLoading === true}
                  />
                </FormControl>
                <FormMessage className={styles.errorMessage} />
              </FormItem>
            )}
          />
        </div>
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

export default PostAPoll;
