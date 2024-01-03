import styles from "./Profile.module.css";
import { fetchProfilePageDetails, fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileCard from "@/components/cards/ProfileCard";
import ProfilePosts from "@/components/display/ProfilePosts";
import { formatDate } from "@/lib/utils";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const userInfo = await fetchUser(user?.id || "");
  const profileInfo = await fetchProfilePageDetails(params.id || "");
  const isMyProfile = user?.id === profileInfo?.id.toString();

  if (!profileInfo) return null;
  if (!profileInfo.onboarded) redirect("/onboarding");
  const mongoId = userInfo?._id;
  const userLikes = userInfo?.likedPosts;
  const userFollowing = userInfo?.following;
  console.log(profileInfo?.likedPosts);

  return (
    <div className={styles.container}>
      <ProfileCard
        isMyProfile={isMyProfile}
        name={profileInfo.name}
        username={profileInfo.username}
        image={profileInfo.image}
        bio={profileInfo.bio}
        id={profileInfo?._id || ""}
        link={profileInfo.link}
        followers={profileInfo.followers.length}
        following={profileInfo.following.length}
        noOfCommunities={profileInfo.communities.length}
        posts={profileInfo.posts.length}
        location={profileInfo?.locationOfUser}
        joinedDate={formatDate(profileInfo?.joinedAt)}
        userFollowing={userFollowing}
        mongoId={mongoId}
      />
      <ProfilePosts
        postsString={JSON.stringify(profileInfo?.posts)}
        likedPostsString={JSON.stringify(profileInfo?.likedPosts)}
        currentUserId={user?.id || ""}
        username={profileInfo?.username}
        author_id={profileInfo?.id}
        author__id={profileInfo?._id}
        author_name={profileInfo?.name}
        author_username={profileInfo?.username}
        author_image={profileInfo?.image}
        mongoId={mongoId}
        userLikes={userLikes}
        userFollowing={userFollowing}
      />
    </div>
  );
};

export default ProfilePage;
