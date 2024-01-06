"use client";

import styles from "./CreatePost.module.css";
import MakeAPost from "@/components/forms/MakeAPost";
import PostAImage from "@/components/forms/PostAImage";
import PostAPoll from "@/components/forms/PostAPoll";
import { useState } from "react";
import { MdEdit, MdImage, MdPoll ,MdOutlineVideoLibrary    } from "react-icons/md";

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
          <div className={styles.text}>Text</div>
          <MdEdit size="0.8em" />
        </div>

        <div
          className={`${styles.tab} ${view === "image" ? styles.selected : ""}`}
          onClick={() => setView("image")}
        >
          <div className={styles.text}>Image</div>
          <MdImage  />
        </div>
        <div
          className={`${styles.tab} ${view === "poll" ? styles.selected : ""}`}
          onClick={() => setView("poll")}
        >
          <div className={styles.text}>Poll</div>
          <MdPoll  />
        </div>

        {/* <div
          className={`${styles.tab} ${view === "video" ? styles.selected : ""}`}
          onClick={() => setView("video")}
        >
          Video
          <MdOutlineVideoLibrary  />
        </div> */}
      </div>
      {view === "text" && <MakeAPost />}
      {view === "image" && <PostAImage />}
      {view === "poll" && <PostAPoll />}
    </div>
  );
};

export default CreatePostPage;
