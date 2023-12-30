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
  
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user?.id || "");
  if (!userInfo?.onboarded) redirect("/onboarding");


  const posts = await fetchPosts();


  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Timeline</h1>
      <div>
        {posts?.length === 0 ? (
          <div className={styles.error}>
            No post found. Follow like minded people to read their stories.
          </div>
        ) : (
          <div>
            {posts?.map((post: any, index) => (
              <PostCard
                key={post._id}
                id={post._id.toString()}
                currentUserId={user?.id}
                parentId={post.parentId}
                content={post.text}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                likes={post.likes}
                author_id={post.author.id}
                author__id={post.author._id.toString()}
                author_name={post.author.name}
                author_username={post.author.username}
                author_image={post.author.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
