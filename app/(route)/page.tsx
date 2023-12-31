import styles from "./page.module.css";
import { fetchPosts } from "@/lib/actions/post.actions";
import PostCard from "@/components/cards/PostCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Home / Komyuniti",
  description: "Making social media more private and community focused.",
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
                mongoId={userInfo._id.toString()}
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
                userLikes={userInfo?.likedPosts}
                userFollowing={userInfo?.following}
                type={post.postType}
                media={post.media}
                options={post?.options}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
