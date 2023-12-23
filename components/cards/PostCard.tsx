import Link from "next/link";
import styles from "./PostCard.module.css";
import Image from "next/image";
import { FaCommentAlt } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import PostOptions from "../mui/PostOptions";
import { FaPlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { RxDotFilled } from "react-icons/rx";
import LikeButton from "../client/LikeButton";
import { calculateTimeAgo } from "@/lib/utils";

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

const PostCard = ({
  id,
  currentUserId,
  parentId,
  content,
  community,
  createdAt,
  comments,
  likes,
  author__id,
  author_name,
  author_username,
  author_image,
  author_id,
}: Props) => {
  const timeAgo = calculateTimeAgo(createdAt);

  const isMyPost = currentUserId === author_id;

  return (
    <div className={styles.main}>
      <div className={styles.info}>
        <Link className={styles.link} href={`/${author_username}`}>
          <div className={styles.dp}>
            <Image
              src={author_image}
              alt="author profile picture"
              height={100}
              width={100}
            />
          </div>
          <div className={styles.name_and_uname}>
            <div className={styles.name}>{author_name}</div>
            <div className={styles.uname}>@{author_username}</div>
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
            <PostOptions postId={id.toString()} />
          </div>
        )}
      </div>
      <Link className={styles.link} href={`/post/${id}`}>
        <div className={styles.post}>{content}</div>
      </Link>
      <div className={styles.actions}>
        <div className={styles.likebar}>
          <LikeButton size="1.5em" />
          <div>{`${likes.length} likes`}</div>
        </div>
        <div className={styles.commentbar}>
          <FaRegCommentAlt className={styles.comment} size="1.5em" />
          <div>{`${comments.length} comments`}</div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
