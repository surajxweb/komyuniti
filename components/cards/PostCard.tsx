import Link from "next/link";
import styles from "./PostCard.module.css";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";

const PostCard = ({content} : {content : any}) => {
  console.log((content.createdAt));
  console.log(content.createdAt.toString());
  

  const createdAtDate = new Date(content.createdAt);

  const formattedDate =
   
    createdAtDate.getHours() +
    ":" +
    createdAtDate.getMinutes() +
    " | " +
    createdAtDate.toLocaleString("en-US", { month: "short", day: "numeric" }) +
    ", " +
    createdAtDate.getFullYear();

  
  return (
    <div className={styles.main}>
      <div className={styles.info}>
        <div className={styles.dp}>
          <Image src={content.author.image} alt="author profile picture" height={100} width={100} />
        </div>
        <div className={styles.name_and_uname}>
          <div className={styles.name}>{content.author.name}</div>
          <div className={styles.uname}>@{content.author.username}</div>
        </div>
        <button className={styles.cta}>Follow +</button>
      </div>
      <div className={styles.post}>{content.text}</div>
      <div className={styles.actions}>
      <FaRegHeart  className={styles.like}  size="1.5em"/>
      <FaRegCommentAlt  className={styles.comment} size="1.5em"/>
      </div>
      <div className={styles.date}>{formattedDate}</div>
    </div>
  );
};

export default PostCard;
