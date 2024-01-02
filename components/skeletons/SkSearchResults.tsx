import styles from "../cards/SearchResults.module.css";
import { IoLocationOutline } from "react-icons/io5";
import { RxDotFilled } from "react-icons/rx";
import Skeleton from "@mui/material/Skeleton";

const SkSearchResults = () => {
  return (
    <div className={styles.main}>
      <div className={styles.image}>
        <Skeleton variant="circular" width={40} height={40} />
      </div>
      <div>
        <div className={styles.flexMe}>
          <div className={styles.name}>
            <Skeleton width={40} variant="text" sx={{ fontSize: "1rem" }} />
          </div>

          <div className={styles.uname}>
            <Skeleton width={40} variant="text" sx={{ fontSize: "1rem" }} />
          </div>
        </div>

        <div className={styles.location}>
          {" "}
          <Skeleton width={120} variant="text" sx={{ fontSize: "1rem" }} />
        </div>
      </div>

      <div className={styles.link}>View Profile</div>
    </div>
  );
};

export default SkSearchResults;
