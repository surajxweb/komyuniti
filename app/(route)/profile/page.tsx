import { redirect } from "next/navigation";
import styles from "./Profile.module.css";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
  const user = await currentUser();

  const userInfo = await fetchUser(user?.id || "");

  redirect(`/${userInfo?.username}`);

  return <div className={styles.container}>Redirecting...</div>;
};

export default Page;
