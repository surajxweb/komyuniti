import { calculateTimeAgo } from "@/lib/utils";
import styles from "./Comments.module.css";
import Image from "next/image";
import { RxDotFilled } from "react-icons/rx";
import LikeButton from "../client/LikeButton";
import { MdOutlineReply  } from "react-icons/md";

interface Props {
  authorString: any;
  content: string;
  createdAt: any;
  likesString: any;
  showReply: any;
  setShowReply: any;
  mongoId: string;
  userLikes: any;
  id: string;
}

const GenZComments = ({
  authorString,
  content,
  createdAt,
  likesString,
  showReply,
  setShowReply,
  mongoId,
  userLikes,
  id,
}: Props) => {
  const author = JSON.parse(authorString);
  const likes = JSON.parse(likesString);

  const timeAgo = calculateTimeAgo(createdAt);
  const isPostLiked = userLikes.includes(id.toString());

  return (
    <div className={styles.bigbox}>
      <div className={styles.displayPicture}>
        <Image src={author.image} alt="author image" height={50} width={50} />
      </div>
      <div className={styles.content}>
        <div className={styles.children}>
          <div className={styles.info}>
            <div className={styles.name}>
              <div className={styles.fname}>{author.name} </div>
              <div className={styles.uname}>@{author.username}</div>
            </div>
            <RxDotFilled color="#b1b1b1" />
            <div className={styles.date}>{timeAgo}</div>
          </div>
          <div className={styles.text}>{content}</div>
          <div className={styles.actions}>
            <MdOutlineReply 
              className={styles.commentbar}
              size="1.2em"
              onClick={() => setShowReply(!showReply)}
            />
            <LikeButton
              isPostLiked={isPostLiked}
              postId={id}
              userId={mongoId || ""}
              size="1.2em"
            />
            <div>{likes.lenght}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenZComments;
