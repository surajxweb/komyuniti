"use client";

import styles from "./CreatePost.module.css";
import MakeAPost from "@/components/forms/MakeAPost";
import PostAImage from "@/components/forms/PostAImage";
import PostAPoll from "@/components/forms/PostAPoll";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaPoll } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";

const CreatePostPage = () => {
  const [view, setView] = useState<string>("text");
  return (
    <div className={styles.container}>
      <div className={styles.heading}>What&#39;s new with you?</div>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${view === "text" ? styles.selected : ""}`}
          onClick={() => setView("text")}
        >
          Text
          <FaPencilAlt size="0.8em" />
        </div>

        <div
          className={`${styles.tab} ${view === "image" ? styles.selected : ""}`}
          onClick={() => setView("image")}
        >
          Image
          <FaImage />
        </div>
        <div
          className={`${styles.tab} ${view === "poll" ? styles.selected : ""}`}
          onClick={() => setView("poll")}
        >
          Poll
          <FaPoll />
        </div>

        {/* <div
          className={`${styles.tab} ${view === "video" ? styles.selected : ""}`}
          onClick={() => setView("video")}
        >
          Video
          <FaVideo />
        </div> */}
      </div>
      {view === "text" && <MakeAPost />}
      {view === "image" && <PostAImage />}
      {view === "poll" && <PostAPoll />}
    </div>
  );
};

export default CreatePostPage;
