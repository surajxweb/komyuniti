import Image from "next/image";
import styles from "./Search.module.css";
import { UserButton } from "@clerk/nextjs";
import { fetchPosts } from "@/lib/actions/post.actions";
import PostCard from "@/components/cards/PostCard";
import { currentUser } from "@clerk/nextjs";
import PostOptions from "@/components/mui/PostOptions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Search / Komyuniti",
  description: "Making social media more prive and community focused.",
};

export default async function Home() {
  const user = await currentUser();

  const userInfo = await fetchUser(user?.id || "");
  if (!userInfo?.onboarded) redirect("/onboarding");

  if (!user) return null;

  const results = await fetchUsers({
    searchString: "",
    userId: user?.id || "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Search</h1>
      <div></div>
    </div>
  );
}
