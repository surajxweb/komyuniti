"use client";

import { useState } from "react";
import styles from "./ProfilePosts.module.css";
import PostCard from "../cards/PostCard";

const ProfilePosts = ({
  posts,
  id,
  username,
}: {
  posts: any;
  id: string;
  username: string;
}) => {
  const [view, setView] = useState<string>("posts");

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
          className={`${styles.tab} ${
            view === "replies" ? styles.selected : ""
          }`}
          onClick={() => setView("replies")}
        >
          Replies
        </div>
        <div
          className={`${styles.tab} ${view === "media" ? styles.selected : ""}`}
          onClick={() => setView("media")}
        >
          Media
        </div>
        <div
          className={`${styles.tab} ${view === "likes" ? styles.selected : ""}`}
          onClick={() => setView("likes")}
        >
          Likes
        </div>
      </div>

      {/* <div>
        {posts?.length === 0 ? (
          <div className={styles.error}>
            {`${username} has not posted yet!`}
          </div>
        ) : (
          <div>
            {posts?.map((post: any) => (
              <PostCard
                key={post._id}
                id={post._id.toString()}
                currentUserId={id}
                parentId={post.parentId}
                content={post.text}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                likes={post.likes}
                author_id={post.author.id}
                author__id={post.author._id.toString()}
                author_name={post.author.name}
                author_username={post.author.username}
                author_image={post.author.image}
              />
            ))}
          </div>
        )}
      </div> */}
    </>
  );
};

export default ProfilePosts;
