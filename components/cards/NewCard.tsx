"use client";

import Link from "next/link";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import PostOptions from "../mui/PostOptions";
import { FaPlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { RxDotFilled } from "react-icons/rx";
import styles from "./PostCard.module.css";

interface Props {
  id: string;
  currentUserId?: string | undefined | null;
  parentId?: string;
  content: string;
  author__id: string;
  author_name: string;
  author_username: string;
  author_image: string;
  author_id: string;

  community?: {
    _id: string;
    name: string;
    image: string;
  };
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  likes: any;
}

const NewCard = ({ past }: { past: any }) => {
  if (!past) return null;
  const post = JSON.parse(past);
  console.log(post);

  const calculateTimeAgo = (timestamp: string) => {
    const postTime = new Date(timestamp);
    const currentTime = new Date();

    const timeDifference = Math.floor(
      (currentTime.getTime() - postTime.getTime()) / 1000
    ); // in seconds

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInWeek = 604800;
    const secondsInMonth = 2628000;
    const secondsInYear = 31536000;

    if (timeDifference < secondsInMinute) {
      return `${timeDifference}s ago`;
    } else if (timeDifference < secondsInHour) {
      return `${Math.floor(timeDifference / secondsInMinute)}m ago`;
    } else if (timeDifference < secondsInDay) {
      return `${Math.floor(timeDifference / secondsInHour)}h ago`;
    } else if (timeDifference < secondsInWeek) {
      return `${Math.floor(timeDifference / secondsInDay)}d ago`;
    } else if (timeDifference < secondsInMonth) {
      return `${Math.floor(timeDifference / secondsInWeek)}w ago`;
    } else if (timeDifference < secondsInYear) {
      return `${Math.floor(timeDifference / secondsInMonth)}mo ago`;
    } else {
      return `${Math.floor(timeDifference / secondsInYear)}y ago`;
    }
  };

  const timeAgo = calculateTimeAgo(post.createdAt);

  //   const isMyPost = currentUserId === post.author_id;
  const isMyPost = true;

  return (
    <div className={styles.main}>
      <div className={styles.info}>
        <Link className={styles.link} href={`/${post.author.name}`}>
          <div className={styles.dp}>
            <Image
              src={post.author.image}
              alt="author profile picture"
              height={100}
              width={100}
            />
          </div>
          <div className={styles.name_and_uname}>
            <div className={styles.name}>{post.author.name}</div>
            <div className={styles.uname}>@{post.author.username}</div>
            <RxDotFilled color="#b1b1b1" />
            <div className={styles.date}>{timeAgo}</div>
          </div>
        </Link>
        {!isMyPost && (
          <button className={styles.cta}>
            Follow <FaPlus />
          </button>
        )}
        {isMyPost && (
          <div className={styles.options}>
            <PostOptions postId={post.id?.toString()} />
          </div>
        )}
      </div>
      <Link className={styles.link} href={`/post/${post.id}`}>
        <div className={styles.post}>{post.text}</div>
      </Link>
      <div className={styles.actions}>
        <div className={styles.likebar}>
          <FaRegHeart className={styles.like} size="1.5em" />
          <div>{`${post.likes.length} likes`}</div>
        </div>
        <div className={styles.commentbar}>
          <FaRegCommentAlt className={styles.comment} size="1.5em" />
          {/* <div>{`${comments.length} comments`}</div> */}
        </div>
      </div>
    </div>
  );
};

export default NewCard;
