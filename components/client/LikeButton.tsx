"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
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
  console.log(isPostLiked);

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
    <FaHeart onClick={disLikeKaro} color="rgb(200, 43, 43)" size={size} />
  ) : (
    <FaRegHeart onClick={likeKaro} className={styles.reactIcon} size={size} />
  );
};

export default LikeButton;
