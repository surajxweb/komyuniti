import styles from "../cards/PostCard.module.css";
import { FaCommentAlt, FaPlus } from "react-icons/fa";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const SkPostCard = ({}) => {
  return (
    <div className={styles.main}>
      <Stack spacing={1}>
        <div className={styles.info}>
          <Skeleton
            animation="wave"
            variant="circular"
            width={50}
            height={50}
          />

          <div className={styles.name_and_uname}>
            <div className={styles.name}>
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ fontSize: "1rem" }}
                width={100}
                height={40}
              />
            </div>
            <div className={styles.uname}>
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ fontSize: "1rem" }}
                width={100}
                height={40}
              />
            </div>
            <div className={styles.date}>
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ fontSize: "1rem" }}
                width={80}
                height={40}
              />
            </div>
          </div>

          <div className={styles.skcta}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={80}
              height={30}
            />
          </div>
        </div>

        <div className={styles.post}>
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "1rem" }}
            height={100}
          />
        </div>

        <div className={styles.actions}>
          <div className={styles.likebar}>
            <div>
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ fontSize: "1rem" }}
                width={60}
                height={40}
              />
            </div>
          </div>

          <div className={styles.commentbar}>
            <div>
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: "1rem" }}
                width={60}
                height={40}
              />
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default SkPostCard;
