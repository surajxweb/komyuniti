"use client";

import Image from "next/image";
import styles from "./Comments.module.css";
import LikeButton from "../client/LikeButton";
import { RxDotFilled } from "react-icons/rx";
import { calculateTimeAgo } from "@/lib/utils";
import { MdOutlineReply } from "react-icons/md";
import GenZComments from "./GenZComments";
import { useState } from "react";
import MakeAComment from "../forms/MakeAComment";

interface Props {
  id: string;
  authorString: any;
  commentsString: any;
  content: string;
  createdAt: string;
  likesString: any;
  currentUserImage: string;
  currentUserId: string;
  mongoId: string;
  userLikes: any;
}

const Comments = ({
  id,
  authorString,
  commentsString,
  content,
  createdAt,
  likesString,
  currentUserImage,
  currentUserId,
  mongoId,
  userLikes,
}: Props) => {
  const [showMoreComments, setShowMoreComments] = useState(false);
  const [showReply, setShowReply] = useState(false);

  // JSON PARSE
  const author = JSON.parse(authorString);
  const comments = JSON.parse(commentsString);
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
          {comments.length > 0 && (
            <button
              onClick={() => setShowMoreComments(!showMoreComments)}
              className={styles.more}
            >
              {showMoreComments ? "Hide replies." : "Show more replies."}
            </button>
          )}
        </div>
        {showReply && (
          <MakeAComment
            postId={id}
            currentUserId={currentUserId}
            currentUserImage={currentUserImage}
          />
        )}
        {showMoreComments && (
          <div className={styles.grandChildren}>
            {comments.map((cmt: any) => (
              <GenZComments
                key={cmt._id}
                id={cmt._id.toString()}
                authorString={JSON.stringify(cmt.author)}
                content={cmt.text}
                createdAt={cmt.createdAt.toString()}
                likesString={JSON.stringify(cmt.likes)}
                showReply={showReply}
                setShowReply={setShowReply}
                mongoId={mongoId}
                userLikes={userLikes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
