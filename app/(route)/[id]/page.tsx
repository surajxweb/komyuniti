import styles from "./Profile.module.css";
import { fetchProfilePageDetails } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileCard from "@/components/cards/ProfileCard";
import PostCard from "@/components/cards/PostCard";
import ProfilePosts from "@/components/display/ProfilePosts";
import { formatDate } from "@/lib/utils";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const userInfo = await fetchProfilePageDetails(params.id || "");
  const isMyProfile = user?.id === userInfo?.id.toString();

  if (!userInfo) return null;
  if (!userInfo.onboarded) redirect("/onboarding");

  return (
    <div className={styles.container}>
      <ProfileCard
      isMyProfile={isMyProfile}
        name={userInfo.name}
        username={userInfo.username}
        image={userInfo.image}
        bio={userInfo.bio}
        id={user?.id}
        link={userInfo.link}
        followers={userInfo.followers.length}
        following={userInfo.following.length}
        noOfCommunities={userInfo.communities.length}
        posts={userInfo.posts.length}
        location={userInfo?.locationOfUser}
        joinedDate={formatDate(userInfo?.joinedAt)}
      />
      <ProfilePosts
        postsString={JSON.stringify(userInfo?.posts)}
        likedPostsString={JSON.stringify(userInfo?.likedPosts)}
        currentUserId={user?.id || ""}
        username={userInfo?.username}
        author_id={userInfo?.id}
        author__id={userInfo?._id}
        author_name={userInfo?.name}
        author_username={userInfo?.username}
        author_image={userInfo?.image}
      />
    </div>
  );
};

export default ProfilePage;
