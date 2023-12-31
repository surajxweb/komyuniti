import { currentUser } from "@clerk/nextjs";
import styles from "./Communities.module.css";
import { fetchUserAndCommunities } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { MdGroupAdd, MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
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
            <MdOutlineSearch size="1.6em" />
          </Link>
          <Link href={"/communities/add"}>
            <MdGroupAdd size="1.6em" />
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
