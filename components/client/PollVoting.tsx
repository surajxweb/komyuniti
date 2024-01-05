"use client";
import { useState } from "react";
import styles from "./PollVoting.module.css";
import { castAVote } from "@/lib/actions/post.actions";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";


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
  const path = usePathname();
  const handelVote = async (voteNumber: number) => {
    setOptimisticVote(true);
    await castAVote({
      postId: id,
      userId: userId,
      voteOption: voteNumber,
      pathname: path,
    });
  };


  const votes = {
    opt1 : options.option1.votes.length,
    opt2 : options.option2.votes.length,
    opt3 : options.option3.votes.length,
    opt4 : options.option4.votes.length,
    getTotalVotes: function () {
      // Calculate the sum of all votes
      return this.opt1 + this.opt2 + this.opt3 + this.opt4;
    },
    percentOfOpt1: function () {
      // Calculate the percentage of votes for opt1
      const totalVotes = this.getTotalVotes();
      return (this.opt1 / totalVotes) * 100 || 0; // Return 0 if totalVotes is 0 to avoid division by zero
    },
    
    percentOfOpt2: function () {
      // Calculate the percentage of votes for opt2
      const totalVotes = this.getTotalVotes();
      return (this.opt2 / totalVotes) * 100 || 0;
    },
    
    percentOfOpt3: function () {
      // Calculate the percentage of votes for opt3
      const totalVotes = this.getTotalVotes();
      return (this.opt3 / totalVotes) * 100 || 0;
    },
    
    percentOfOpt4: function () {
      // Calculate the percentage of votes for opt4
      const totalVotes = this.getTotalVotes();
      return (this.opt4 / totalVotes) * 100 || 0;
    },
  };
  

  return optimisticVote ? (
    <div className={styles.results}>
      {options.option1.text.length > 1 && (
        <div className={styles.result}>
          {options.option1.text}
          <motion.div
            className={styles.resultBar}
            initial={{ width: 0 }}
            animate={{ width: `${votes.percentOfOpt1()}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className={styles.resultsText}>{options.option1.text}</div>
          </motion.div>
        </div>
      )}
      {options.option2.text.length > 1 && (
        <div className={styles.result}>
          {options.option2.text}
          <motion.div
            className={styles.resultBar}
            initial={{ width: 0 }}
            animate={{ width: `${votes.percentOfOpt2()}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className={styles.resultsText}>{options.option2.text}</div>
          </motion.div>
        </div>
      )}
      {options.option3.text.length > 1 && (
        <div className={styles.result}>
          {options.option3.text}
          <motion.div
            className={styles.resultBar}
            initial={{ width: 0 }}
            animate={{ width: `${votes.percentOfOpt3()}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className={styles.resultsText}>{options.option3.text}</div>
          </motion.div>
        </div>
      )}
      {options.option4.text.length > 1 && (
        <div className={styles.result}>
          {options.option4.text}
          <motion.div
            className={styles.resultBar}
            initial={{ width: 0 }}
            animate={{ width:`${votes.percentOfOpt4()}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          ></motion.div>
          <div className={styles.resultsText}>{options.option4.text}</div>
        </div>
      )}
      <div className={styles.message}>{`Based on ${votes.getTotalVotes()} ${votes.getTotalVotes() === 1 ? "vote":"votes"}.`}</div>
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
      <div className={styles.message}>To keep the sprite of democracy alive, voting is anonymous and cannot be changed.</div>
    </div>
  );
};

export default PollVoting;
