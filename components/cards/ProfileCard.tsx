import Image from "next/image";
import styles from "./ProfileCard.module.css";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";

interface Props {
  name: string;
  username: string;
  image: string;
  bio: string;
  id?: string;
  link?: string | null | undefined;
  followers: number;
  following: number;
  posts: number;
}

const ProfileCard = ({
  name,
  username,
  image,
  bio,
  id,
  link,
  followers,
  following,
  posts,
}: Props) => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.image}>
          <Image src={image} alt="display picture" height={400} width={400} />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          <div className={styles.username}>@{username}</div>
          <div className={styles.bio}>{bio}</div>
          {link && <Link href={link}>{link}</Link>}
          <Link className={styles.edit} href={"/profile/edit"}>
            <div>Edit Profile</div>
            <AiFillEdit />
          </Link>
        </div>
      </div>
      <div className={styles.data}>
        <div className={styles.posts}>
          <div className={styles.text}>Posts</div>
          <div className={styles.number}>{posts}</div>
        </div>
        <div className={styles.follower}>
          <div className={styles.text}>Followers</div>
          <div className={styles.number}>{followers}</div>
        </div>
        <div className={styles.following}>
          <div className={styles.text}>Following</div>
          <div className={styles.number}>{following}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
