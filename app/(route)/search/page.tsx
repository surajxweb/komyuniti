import styles from "./Search.module.css";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Search from "@/components/forms/Search";

export const metadata = {
  title: "Search / Komyuniti",
  description: "Making social media more private and community focused.",
};

export default async function Page() {
  const user = await currentUser();

  const userInfo = await fetchUser(user?.id || "");
  if (!userInfo?.onboarded) redirect("/onboarding");

  if (!user) return null;

  const results = await fetchUsers({
    searchString: "ruhi",
    userId: user?.id,
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <div className={styles.container}>
      <Search />
    </div>
  );
}
