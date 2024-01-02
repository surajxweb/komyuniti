import Image from "next/image";
import styles from "./ProfileCard.module.css";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import FollowButton from "../client/FollowButton";
import { FaMessage } from "react-icons/fa6";

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
  joinedDate: string;
  location: string;
  noOfCommunities: number;
  isMyProfile: boolean;
  userFollowing: any;
  mongoId: string;
}

const ProfileCard = ({
  name,
  username,
  image,
  bio,
  id,
  link,
  joinedDate,
  location,
  followers,
  following,
  posts,
  noOfCommunities,
  isMyProfile,
  userFollowing,
  mongoId,
}: Props) => {
  const isFollowing = id ? userFollowing.includes(id.toString()) : "";

  return (
    <>
      <div className={styles.main}>
        <div className={styles.image}>
          <Image src={image} alt="display picture" height={400} width={400} />
        </div>
        <div className={styles.info}>
          <div className={styles.name_uname}>
            <div className={styles.name}>{name}</div>
            <RxDotFilled color="#b1b1b1" />
            <div className={styles.username}>@{username}</div>
          </div>
          <div className={styles.bio}>{bio}</div>
          {link && link?.length > 1 && (
            <div className={styles.link}>
              <IoIosLink size="0.8em" />
              <Link target="_blank" href={`https://${link}`}>
                {link}
              </Link>
            </div>
          )}

          {location && location?.length > 1 && (
            <div className={styles.link}>
              <IoLocationOutline size="0.8em" />
              <div> {`Lives in ${location}`}</div>
            </div>
          )}

          {joinedDate && joinedDate?.length > 1 && (
            <div className={styles.link}>
              <IoCalendarOutline size="0.8em" />
              <div>{` Joined on ${joinedDate}`}</div>
            </div>
          )}
        </div>
      </div>
      {isMyProfile ? (
        <div className={styles.edits}>
          <Link className={styles.edit} href={"/profile/edit"}>
            <div>Edit Profile</div>
            <AiFillEdit />
          </Link>
          <Link className={styles.edit} href={"/profile/settings"}>
            <div>Settings</div>
            <IoIosSettings />
          </Link>
        </div>
      ) : (
        <div className={styles.ctactions}>
          <FollowButton
            isFollowing={isFollowing}
            userId={mongoId}
            targetUserId={id || ""}
          />
          {/* <Link className={styles.message} href={"/messages"}>
            Message <FaMessage />
          </Link> */}
        </div>
      )}
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
        <div className={styles.posts}>
          <div className={styles.text}>Communities</div>
          <div className={styles.number}>{noOfCommunities}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
