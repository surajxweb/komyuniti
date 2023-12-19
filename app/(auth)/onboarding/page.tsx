import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useState } from "react";

export const metadata = {
  title: "Onboarding / Komyuniti",
  description: "Making social media more private and community focused.",
};

const Page = async () => {
  const user = await currentUser();

  const userInfo = await fetchUser(user?.id || "");
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user?.id || "",
    objectId: userInfo?._id.toString() || "",
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName,
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  

  return (
    <div>
      <h1>Welcome to Komyuniti! </h1>
      <div>
        <AccountProfile user={userData} btnTitle={"Continue to Komyuniti"} />
      </div>
    </div>
  );
};

export default Page;
