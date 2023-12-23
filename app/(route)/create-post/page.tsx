import { fetchUser } from "@/lib/actions/user.actions";
import styles from "./CreatePost.module.css";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import MakeAPost from "@/components/forms/MakeAPost";

const CreatePostPage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userKaId = userInfo._id.toString();

  return (
    <div className={styles.container}>
      <div className={styles.heading}>What&#39;s new with you?</div>
      <MakeAPost userId={userKaId} />
    </div>
  );
};

export default CreatePostPage;
