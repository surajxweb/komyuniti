import Image from "next/image";
import Link from "next/link";
import FollowButton from "../client/FollowButton";
import styles from "./DiscoverCard.module.css";
import { GrFormNextLink } from "react-icons/gr";

const DiscoverCard = ({
  type,
  id,
  image,
  name,
  username,
  themeColor,
}: {
  type: string;
  id: string;
  image: string;
  name: string;
  username?: string;
  themeColor?: string;
}) => {
  const borderStyleForComms = {
    border: `2px solid ${themeColor}`,
  };
  const borderStyleForUsers = {
    border: `2px solid #ccc`,
  };
  return (
    <div className={styles.main}>
      <div
        className={styles.image}
        style={themeColor ? borderStyleForComms : borderStyleForUsers}
      >
        <Image src={image} height={60} width={60} alt="profile photo" />
      </div>
      <div className={styles.names}>
        <div className={styles.name}>{name}</div>
        {type === "user" && <div className={styles.uname}>{username}</div>}
      </div>
      {/* <div className={styles.cta}><FollowButton /></div> */}
      <Link
        href={type === "user" ? `/${username}` : `/communities/${id}`}
        className={styles.cta}
      >
        View <GrFormNextLink />
      </Link>
    </div>
  );
};

export default DiscoverCard;
