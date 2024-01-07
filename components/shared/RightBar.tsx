import Link from "next/link";
import Image from "next/image";
import styles from "./RightBar.module.css";
import { fetchUsersWithHighestV } from "@/lib/actions/user.actions";
import DiscoverCard from "../cards/DiscoverCard";
import { currentUser } from "@clerk/nextjs";
import { fetchCommunityWithHighestV } from "@/lib/actions/community.actions";

const RightBar = async () => {
  const user = await currentUser();
  if (!user) return null;
  const topUsers = await fetchUsersWithHighestV(user?.id || "", 8);
  const topCommunities = await fetchCommunityWithHighestV(5);

  return (
    <div className={styles.container}>
      <div className={styles.people}>
        <h2>Discover People</h2>
        <div className={styles.listContainer}>
          {topUsers.map((user: any) => (
            <DiscoverCard
              type={"user"}
              id={user._id}
              image={user.image}
              name={user.name}
              username={user.username}
              key={user.id}
            />
          ))}
        </div>
      </div>
      <div className={styles.communities}>
        <h2 style={{ marginTop: "20px" }}>Discover Communities</h2>
        <div className={styles.listContainer}>
          {topCommunities.map((comm: any) => (
            <DiscoverCard
              type={"community"}
              id={comm._id.toString()}
              image={comm.header_image}
              name={comm.name}
              key={comm.id}
              themeColor={comm.themeColor}
            />
          ))}
        </div>
      </div>
      <div className={styles.links}>
        <Link className={styles.link} href={""}>
          About Us
        </Link>
        <Link className={styles.link} href={""}>
          Privacy Policy
        </Link>
        <Link className={styles.link} href={""}>
          Terms and Conditions
        </Link>
      </div>
    </div>
  );
};

export default RightBar;
