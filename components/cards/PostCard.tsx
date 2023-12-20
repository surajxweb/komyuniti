import Link from "next/link";
import styles from "./PostCard.module.css";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import PostOptions from "../mui/PostOptions";
import { FaPlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { RxDotFilled } from "react-icons/rx";

interface Props {
  id: string;
  currentUserId?: string | undefined | null;
  parentId?: string;
  content: string;
  author: {
    _id: string;
    name: string;
    username: string;
    image: string;
    id: string;
  };
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

const PostCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  likes,
}: Props) => {
 
  
  const calculateTimeAgo = (timestamp: string) => {
    const postTime = new Date(timestamp);
    const currentTime = new Date();

    const timeDifference = Math.floor((currentTime.getTime() - postTime.getTime()) / 1000); // in seconds

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

  const timeAgo = calculateTimeAgo(createdAt);


  const isMyPost = currentUserId === author.id;
  const description =
    comments.length === 0 && likes.length === 0
      ? "Be the first one to like and start a conversation."
      : likes.length === 0 
      ? "Be the first one to like."
      : comments.length === 0
      ? "Be the first one to start a conversation."
      : comments.length !== 0
      ? "Join the conversation."
      : "";

      console.log("ye time hai: ", createdAt.toString());
      

  return (
    <div className={styles.main}>
      <div className={styles.info}>
        <Link className={styles.link} href={`/${author.username}`}>
          <div className={styles.dp}>
            <Image
              src={author.image}
              alt='author profile picture'
              height={100}
              width={100}
            />
          </div>
          <div className={styles.name_and_uname}>
            <div className={styles.name}>{author.name}</div>
            <div className={styles.uname}>@{author.username}</div>
            <RxDotFilled color= "#b1b1b1" />
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
            <PostOptions postId={id.toString()} />
          </div>
        )}
      </div>
      <Link className={styles.link} href={`/post/${id}`}>
        <div className={styles.post}>{content}</div>
      </Link>
      <div className={styles.actions}>
        <div>
        <FaRegHeart className={styles.like} size='1.5em' />

        </div>
        <div>
        <FaRegCommentAlt className={styles.comment} size='1.5em' />

        </div>
      </div>
      {!isMyPost && <div className={styles.description}>{description}</div>}
    </div>
  );
};

export default PostCard;
