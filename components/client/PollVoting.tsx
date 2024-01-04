"use client";
import { useState } from "react";
import styles from "./PollVoting.module.css";
import { castAVote } from "@/lib/actions/post.actions";

const PollVoting = ({
  options,
  hasVoted,
  userId,
  id,
}: {
  id: string;
  options: any;
  hasVoted: boolean;
  userId: string;
}) => {
  const [optimisticVote, setOptimisticVote] = useState<Boolean>(hasVoted);
  const handelVote = async (voteNumber: number) => {
    // setOptimisticVote(true);
    await castAVote({
      postId: id,
      userId: userId,
      voteOption: voteNumber,
    });
  };

  console.log(options.option1.text);

  return optimisticVote ? (
    <div className={styles.results}>
      {options.option1.text.length > 1 && (
        <div className={styles.result}>
          {options.option1.text}
          <div
            className={styles.resultBar}
            style={{
              width: "50%",
            }}
          >
            {options.option1.text}
          </div>
        </div>
      )}
      {options.option2.text.length > 1 && (
        <div className={styles.result}>
          {options.option2.text}
          <div
            className={styles.resultBar}
            style={{
              width: "50%",
            }}
          >
            {options.option2.text}
          </div>
        </div>
      )}
      {options.option3.text.length > 1 && (
        <div className={styles.result}>
          {options.option3.text}
          <div
            className={styles.resultBar}
            style={{
              width: "50%",
            }}
          >
            {options.option3.text}
          </div>
        </div>
      )}
      {options.option4.text.length > 1 && (
        <div className={styles.result}>
          {options.option4.text}
          <div
            className={styles.resultBar}
            style={{
              width: "50%",
            }}
          >
            {options.option4.text}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className={styles.options}>
      {options.option1.text.length > 1 && (
        <div onClick={() => handelVote(1)} className={styles.option}>
          {options.option1.text}
        </div>
      )}
      {options.option2.text.length > 1 && (
        <div onClick={() => handelVote(2)} className={styles.option}>
          {options.option2.text}
        </div>
      )}
      {options.option3.text.length > 1 && (
        <div onClick={() => handelVote(3)} className={styles.option}>
          {options.option3.text}
        </div>
      )}
      {options.option4.text.length > 1 && (
        <div onClick={() => handelVote(4)} className={styles.option}>
          {options.option4.text}
        </div>
      )}
    </div>
  );
};

export default PollVoting;
