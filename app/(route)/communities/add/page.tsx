import CommunityProfile from "@/components/forms/CommunityProfile";
import styles from "./Add.module.css";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import BackButton from "@/components/client/BackButton";
const Add = async () => {
  const user = await currentUser();
  const userInfo = await fetchUser(user?.id || "");
  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <div className={styles.container}>
      <BackButton />
      <CommunityProfile
        mongoId={userInfo?._id}
        userId={user?.id || ""}
        btnTitle={"Create Community"}
        heading={"Create A Community"}
      />
    </div>
  );
};

export default Add;
