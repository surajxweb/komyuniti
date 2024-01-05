import styles from "./Activity.module.css";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Activity / Komyuniti",
  description: "Making social media more private and community focused.",
};

export default async function Page() {
  const user = await currentUser();

  const userInfo = await fetchUser(user?.id || "");
  if (!userInfo?.onboarded) redirect("/onboarding");

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Activity</h1>
      <div></div>
    </div>
  );
}
