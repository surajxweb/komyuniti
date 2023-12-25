import styles from "./CreatePost.module.css";
import MakeAPost from "@/components/forms/MakeAPost";

const CreatePostPage = async () => {

  return (
    <div className={styles.container}>
      <div className={styles.heading}>What&#39;s new with you?</div>
      <MakeAPost  />
    </div>
  );
};

export default CreatePostPage;
