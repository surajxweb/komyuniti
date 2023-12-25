import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import styles from "./Profile.module.css";
import ProfileCard from "@/components/cards/ProfileCard";
import { fetchPostsByUserId } from "@/lib/actions/post.actions";
import PostCard from "@/components/cards/PostCard";

const Page = async () => {
  const user = await currentUser();
  const userInfo = await fetchUser(user?.id || "");

  if (!userInfo) return null;
  if (!userInfo.onboarded) redirect("/onboarding");
  const posts = await fetchPostsByUserId({
    id: user?.id || "",
  });

  console.log();

  return (
    <div className={styles.container}>
      <ProfileCard
        name={userInfo.name}
        username={userInfo.username}
        image={userInfo.image}
        bio={userInfo.bio}
        id={user?.id}
        link={userInfo.link}
        followers={userInfo.followers.length}
        following={userInfo.following.length}
        posts={userInfo.posts.length}
      />
      <div>
        {posts?.length === 0 ? (
          <div className={styles.error}>
            {`${userInfo.username} has not posted yet!`}
          </div>
        ) : (
          <div>
            {posts?.map((post: any) => (
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
};

export default Page;
