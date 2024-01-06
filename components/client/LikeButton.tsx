"use client";

import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import styles from "./LikeButton.module.css";
import { likeAPost, unlikeAPost } from "@/lib/actions/post.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LikeButton = ({
  isPostLiked,
  userId,
  postId,
  size,
}: {
  isPostLiked: boolean;
  userId: string;
  postId: string;
  size: string;
}) => {
  const [optimisticLike, setOptimisticLike] = useState<Boolean>(isPostLiked);

  const pathname = usePathname();
  const likeKaro = async () => {
    setOptimisticLike(true);
    await likeAPost({
      path: pathname,
      userId: userId,
      postId: postId,
    });
  };

  const disLikeKaro = async () => {
    setOptimisticLike(false);
    await unlikeAPost({
      path: pathname,
      userId: userId,
      postId: postId,
    });
  };
  return optimisticLike ? (
    <IoMdHeart onClick={disLikeKaro} color="rgb(249, 24, 128)" size={size} />
  ) : (
    <IoMdHeartEmpty
      onClick={likeKaro}
      className={styles.reactIcon}
      size={size}
    />
  );
};

export default LikeButton;
