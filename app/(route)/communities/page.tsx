import { currentUser } from "@clerk/nextjs";
import styles from "./Communities.module.css";
import { fetchUserAndCommunities } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { SiAddthis } from "react-icons/si";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import CommunityCard from "@/components/cards/CommunityCard";
import CarouselComponent from "@/components/display/Carousel";

const Page = async () => {
  const user = await currentUser();
  const userInfo = await fetchUserAndCommunities(user?.id || "");
  if (userInfo?.onboarded === false) redirect("/onboarding");

  return (
    <div className={styles.container}>
      <div className={styles.headingSection}>
        <h1 className={styles.heading}>Communities</h1>
        <div className={styles.action}>
          <Link href={"/communities/search"}>
            <IoSearch size="1.6em" />
          </Link>
          <Link href={"/communities/add"}>
            <SiAddthis size="1.6em" />
          </Link>
        </div>
      </div>
      {userInfo.communities.length > 0 ? (
        <CarouselComponent comms={JSON.stringify(userInfo?.communities)} />
      ) : (
        <div className={styles.error}>
          You are not part of any community. Either look for one, or create one
          and invite your friends.
        </div>
      )}
    </div>
  );
};

export default Page;
