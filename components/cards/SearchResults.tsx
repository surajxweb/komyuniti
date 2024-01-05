import Image from "next/image";
import Link from "next/link";
import styles from "./SearchResults.module.css";
import { IoLocationOutline } from "react-icons/io5";
import { RxDotFilled } from "react-icons/rx";

const SearchResults = ({
  id,
  username,
  image,
  bio,
  name,
  location,
  type,
}: {
  id: string;
  username: string;
  image: string;
  bio: string;
  name: string;
  location: string;
  type?: string;
}) => {
  return (
    <div className={styles.main}>
      <div className={styles.image}>
        <Image src={image} height={50} width={50} alt="profile photo" />
      </div>
      <div>
        <div className={styles.flexMe}>
          <div className={styles.name}>{name}</div>
          {type !== "community" && <RxDotFilled color="#b1b1b1" />}

          {type !== "community" && (
            <div className={styles.uname}>@{username}</div>
          )}
        </div>

        {type !== "community" && location && location?.length > 1 && (
          <div className={styles.location}> {`Lives in ${location}`}</div>
        )}
      </div>

      <Link
        className={styles.link}
        href={type === "community" ? `/communities/${id}` : `/${username}`}
      >
        {type === "community" ? "View" : "View Profile"}
      </Link>
    </div>
  );
};

export default SearchResults;
