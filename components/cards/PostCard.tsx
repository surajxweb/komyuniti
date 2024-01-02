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
import mongoose from "mongoose";
import FollowButton from "../client/FollowButton";

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
  mongoId: string;
  userLikes: any;
  userFollowing: any;
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
  mongoId,
  userLikes,
  userFollowing,
}: Props) => {
  const timeAgo = calculateTimeAgo(createdAt);

  const isMyPost = currentUserId === author_id;

  const isPostLiked = userLikes.includes(id.toString());
  const isFollowing = userFollowing.includes(author__id.toString());

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
        {/* {!isMyPost ? (
          <FollowButton
            isFollowing={isFollowing}
            targetUserId={author__id}
            userId={mongoId || ""}
          />
        ) : (
          <div className={styles.options}>
            <PostOptions postId={id.toString()} />
          </div>
        )} */}

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
          <LikeButton
            isPostLiked={isPostLiked}
            postId={id}
            userId={mongoId || ""}
            size="1.5em"
          />
          <div>{`${likes.length} ${
            likes.length === 1 ? "like" : "likes"
          }`}</div>
        </div>
        <Link className={styles.link} href={`/post/${id}`}>
          <div className={styles.commentbar}>
            <FaRegCommentAlt className={styles.comment} size="1.5em" />
            <div>{`${comments.length}  ${
              comments.length === 1 ? "comment" : "comments"
            }`}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
