"use client";

import { MdAdd } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import styles from "./FollowButton.module.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { followUser, unfollowUser } from "@/lib/actions/user.actions";

const FollowButton = ({
  isFollowing,
  userId,
  targetUserId,
}: {
  isFollowing: boolean;
  userId: string;
  targetUserId: string;
}) => {
  const [optimisticFollow, setOptimisticFollow] =
    useState<Boolean>(isFollowing);
  const pathname = usePathname();

  const followKaro = async () => {
    setOptimisticFollow(true);
    await followUser({
      path: pathname,
      userId: userId,
      userToFollow: targetUserId,
    });
  };

  const unFollowKaro = async () => {
    setOptimisticFollow(false);
    await unfollowUser({
      path: pathname,
      userId: userId,
      userToUnfollow: targetUserId,
    });
  };

  return (
    <>
      {!optimisticFollow ? (
        <button className={styles.ctaf} onClick={followKaro}>
          Follow <MdAdd />
        </button>
      ) : (
        <button className={styles.ctaunf} onClick={unFollowKaro}>
          Following <TiTick />
        </button>
      )}
    </>
  );
};

export default FollowButton;
