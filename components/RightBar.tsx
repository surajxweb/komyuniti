import Link from "next/link";
import Image from "next/image";
import styles from "./RightBar.module.css";

const RightBar = () => {
  return <div className={styles.container}> 
  <div className={styles.communities}>
  <h2>Discover Communities</h2>
  </div>
  <div className={styles.people}>
  <h2>Discover Friends</h2>
  </div>

  </div>;
};

export default RightBar;
