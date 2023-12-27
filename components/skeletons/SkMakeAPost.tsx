import styles from "../forms/MakeAPost.module.css";
import Skeleton from "@mui/material/Skeleton";

const MakeAPost = () => {
  return (
    <div className={styles.form}>
      <div className={styles.field}>
        <div className={styles.input} />
        <Skeleton animation="wave" variant="rounded" width={210} height={60} />
      </div>

      <div className={styles.description}>
        Please ensure that your post respects the feelings and opinions of
        others on the Komyuniti App, and adhere to our community guidelines.
      </div>
      <div className={styles.submitButton}>Share</div>
    </div>
  );
};

export default MakeAPost;
