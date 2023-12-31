import Link from "next/link";
import styles from "./PostCard.module.css";
import Image from "next/image";
import { MdComment } from "react-icons/md";
import PostOptions from "../mui/PostOptions";
import { RxDotFilled } from "react-icons/rx";
import LikeButton from "../client/LikeButton";
import { calculateTimeAgo } from "@/lib/utils";
import FollowButton from "../client/FollowButton";
import PollVoting from "../client/PollVoting";

interface Props {
  id: string;
  currentUserId?: string | undefined | null;
  parentId?: string;
  type?: string;
  media?: string;
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
  options?: any;
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
  media,
  type,
  options,
}: Props) => {
  const timeAgo = calculateTimeAgo(createdAt);

  const isMyPost = currentUserId === author_id;

  const isPostLiked = userLikes.includes(id.toString());
  // const isFollowing = userFollowing.includes(author__id.toString());
  const hasVoted =
    options.option1.votes.includes(mongoId) ||
    options.option2.votes.includes(mongoId) ||
    options.option3.votes.includes(mongoId) ||
    options.option4.votes.includes(mongoId);

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
            <RxDotFilled className={styles.reactIcon} color="#b1b1b1" />
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
      <Link className={styles.content} href={`/post/${id}`}>
        {type === "image" && media && media.length > 1 && (
          <Image src={media} alt="content image" height={400} width={400} />
        )}
        <div
          className={`${
            media && media.length > 1 ? styles.caption : styles.post
          }`}
        >
          {content}
        </div>
      </Link>

      {type === "poll" && options && (
        <PollVoting
          id={id}
          hasVoted={hasVoted}
          userId={mongoId}
          options={options}
        />
      )}

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
            <MdComment className={styles.comment} size="1.5em" />
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
