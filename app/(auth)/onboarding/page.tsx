import AccountProfile from "@/components/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { useState } from "react";

export const metadata = {
  title: "Onboarding / Komyuniti",
  description: "Making social media more private and community focused.",
};

// interface UserProperties {

//       _id: string,
//       _objectId :string,
//       _username: string,
//       _name: string,
//       _bio: string,
//       _image: string

// }

const Page = async () => {
  const user = await currentUser();

  const userInfo = {};

  const userData = {
    id: "some data",
    objectId: userInfo?._id,
    username: userInfo?._username || user?.username,
    name: userInfo?._name || user?.firstName,
    bio: userInfo?._bio || "",
    image: userInfo?._image || user?.imageUrl,
  };

  return (
    <div>
      <h1>Welcome to Komyuniti! </h1>
      <div>
        <AccountProfile user={userData} btnTitle={"Submit"} />
      </div>
    </div>
  );
};

export default Page;
