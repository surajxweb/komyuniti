import Image from "next/image";
import styles from "./page.module.css";
import { UserButton } from "@clerk/nextjs";
import { fetchPosts } from "@/lib/actions/post.actions";
import PostCard from "@/components/cards/PostCard";
import { currentUser } from "@clerk/nextjs";
import PostOptions from "@/components/mui/PostOptions";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Home / Komyuniti",
  description: "Making social media more prive and community focused.",
};

export default async function Home() {
  const posts = await fetchPosts();
  const user = await currentUser();

  console.log(posts);

  const userInfo = await fetchUser(user?.id || "");
  if (!userInfo?.onboarded) redirect("/onboarding");

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Timeline</h1>
      {posts?.length === 0 ? (
        <div className={styles.error}>
          No post found. Follow like minded people to read their stories.
        </div>
      ) : (
        <>
          {posts?.map((post: any) => (
            <PostCard
              key={post._id}
              id={post._id}
              currentUserId={user?.id}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
              likes={post.likes}
            />
          ))}
        </>
      )}
    </div>
  );
}
