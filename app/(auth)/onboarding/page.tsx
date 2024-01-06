import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { SignOutButton, SignedIn, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { MdLogout } from "react-icons/md";
import styles from "./Onboarding.module.css";

export const metadata = {
  title: "Onboarding / Komyuniti",
  description: "Making social media more private and community focused.",
};

const Page = async () => {
  const user = await currentUser();

  const userInfo = await fetchUser(user?.id || "");
  if (userInfo?.onboarded) redirect("/");

  const fullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName
      ? user.firstName
      : user?.lastName
      ? user.lastName
      : "";

  const userData = {
    id: user?.id || "",
    objectId: userInfo?._id.toString() || "",
    username: userInfo?.username || user?.username,
    name: userInfo?.name || fullName,
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
    link: userInfo?.link || "",
    location: userInfo?.locationOfUser || "",
    email: userInfo?.emailOfUser || user?.emailAddresses[0].emailAddress,
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <SignedIn>
        <SignOutButton>
          <div className={`${styles.link} ${styles.logout}`}>
            <MdLogout size="2em" className={styles.icons} />
            <div className={styles.options}>Logout</div>
          </div>
        </SignOutButton>
      </SignedIn>
      <AccountProfile
        user={userData}
        btnTitle={"Submit and Continue ⏭️"}
        heading={"Welcome to Komyuniti 😁"}
      />
    </div>
  );
};

export default Page;
