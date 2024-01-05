"use client";

import { useState, useEffect } from "react";
import styles from "./ProfilePosts.module.css";
import PostCard from "../cards/PostCard";

const ProfilePosts = ({
  likedPostsString,
  postsString,
  currentUserId,
  username,
  author_id,
  author__id,
  author_name,
  author_username,
  author_image,
  mongoId,
  userLikes,
  userFollowing,
}: {
  likedPostsString: any;
  postsString: any;
  currentUserId: string;
  username: string;
  author_id: string;
  author__id: string;
  author_name: string;
  author_username: string;
  author_image: string;
  mongoId: string;
  userLikes: any;
  userFollowing: any;
}) => {
  const [view, setView] = useState<string>("posts");

  // JSON PARSE
  const posts = JSON.parse(postsString);
  const likedPosts = JSON.parse(likedPostsString);

  const postToDisplay =
    view === "posts"
      ? posts.filter((post: any) => post.postType === "text")
      : view === "media"
      ? posts.filter(
          (post: any) => post.postType === "image" || post.postType === "video"
        )
      : view === "polls"
      ? posts.filter((post: any) => post.postType === "poll")
      : view === "likes"
      ? likedPosts
      : [];

  return (
    <>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${view === "posts" ? styles.selected : ""}`}
          onClick={() => setView("posts")}
        >
          Posts
        </div>
        <div
          className={`${styles.tab} ${view === "media" ? styles.selected : ""}`}
          onClick={() => setView("media")}
        >
          Media
        </div>
        <div
          className={`${styles.tab} ${view === "polls" ? styles.selected : ""}`}
          onClick={() => setView("polls")}
        >
          Polls
        </div>

        {/* <div
          className={`${styles.tab} ${view === "likes" ? styles.selected : ""}`}
          onClick={() => setView("likes")}
        >
          Likes
        </div> */}
      </div>

      <div className={styles.postsDisplay}>
        {postToDisplay?.length === 0 ? (
          <div className={styles.error}>{`Nothing to show here yet!`}</div>
        ) : (
          <div>
            {postToDisplay?.map((post: any) => (
              <PostCard
                key={post._id}
                id={post._id.toString()}
                currentUserId={currentUserId}
                parentId={post.parentId}
                content={post.text}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                likes={post.likes}
                author_id={author_id}
                author__id={author__id}
                author_name={author_name}
                author_username={author_username}
                author_image={author_image}
                mongoId={mongoId}
                userLikes={userLikes}
                userFollowing={userFollowing}
                type={post.postType}
                media={post.media}
                options={post?.options}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePosts;
