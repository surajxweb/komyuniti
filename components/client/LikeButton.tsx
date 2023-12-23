import { FaHeart, FaRegHeart } from "react-icons/fa";

const isPostLiked = false; // pending implementation

const LikeButton = ({size}: {size: string}) => {
  return isPostLiked ? (
    <FaHeart color='rgb(200, 43, 43)' size={size} />
  ) : (
    <FaRegHeart size={size} />
  );
};

export default LikeButton;
