import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "./LikeButton.module.css";

const isPostLiked = false; // pending implementation

const LikeButton = ({ size }: { size: string }) => {
  return isPostLiked ? (
    <FaHeart color="rgb(200, 43, 43)" size={size} />
  ) : (
    <FaRegHeart className={styles.reactIcon} size={size} />
  );
};

export default LikeButton;
