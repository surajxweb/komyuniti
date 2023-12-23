"use client";

import Image from "next/image";
import styles from "./Comments.module.css";
import LikeButton from "../client/LikeButton";
import { RxDotFilled } from "react-icons/rx";
import { calculateTimeAgo } from "@/lib/utils";
import { FaReply } from "react-icons/fa";

interface Props {
  id: string;
  authorString: any;
  commentsString: any;
  content: string;
  createdAt: string;
  likesString: any;
}

const Comments = ({
  id,
  authorString,
  commentsString,
  content,
  createdAt,
  likesString,
}: Props) => {
  // JSON PARSE
  const comments = JSON.parse(commentsString);
  const author = JSON.parse(authorString);
  const likes = JSON.parse(likesString);

  // test logs

  

  const timeAgo = calculateTimeAgo(createdAt);

  return (
    <div className={styles.bigbox}>
      <div className={styles.displayPicture}>
        <Image src={author.image} alt="author image" height={50} width={50} />
      </div>
      <div className={styles.content}>
        <div className={styles.children}>
          <div className={styles.info}>
            <div className={styles.name}>
              {`${author.name} @${author.username}`}
            </div>
            <RxDotFilled color="#b1b1b1" />
            <div className={styles.date}>{timeAgo}</div>
          </div>
          <div className={styles.text}>{content}</div>
          <div className={styles.actions}>
            <FaReply size="1.2em" />
            <LikeButton size="1.2em" />
            <div>{likes.lenght}</div>
          </div>
          <div
            className={styles.more}
          >{`View ${comments.lenght} replies.`}</div>
        </div>
        <div className={styles.grandChildren}></div>
      </div>
    </div>
  );
};

export default Comments;
