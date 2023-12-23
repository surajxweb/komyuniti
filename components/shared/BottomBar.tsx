import styles from "./BottomMenu.module.css";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { MdGroups } from "react-icons/md";
import { HiUser } from "react-icons/hi";
import { BiMessageAltDots } from "react-icons/bi";

const Bottom = () => {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link href={"/"} className={`${styles.link} ${styles.selected}`}>
          <HiHome size="2.2em" className={styles.icons} />
          <div className={styles.options}>Home</div>
        </Link>
        <Link href={"/"} className={styles.link}>
          <HiSearch size="2.2em" className={styles.icons} />
          <div className={styles.options}>Search</div>
        </Link>
        <Link href={"/"} className={styles.link}>
          <HiOutlineHeart size="2em" className={styles.icons} />
          <div className={styles.options}>Activity</div>
        </Link>
        <Link href={"/"} className={styles.link}>
          <BiMessageAltDots size="2.2em" className={styles.icons} />
          <div className={styles.options}>Messages</div>
        </Link>

        <Link href={"/"} className={styles.link}>
          <MdGroups size="2.2em" className={styles.icons} />
          <div className={styles.options}>Communities</div>
        </Link>
      </div>
    </div>
  );
};

export default Bottom;
