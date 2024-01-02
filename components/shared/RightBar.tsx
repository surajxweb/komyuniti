import Link from "next/link";
import Image from "next/image";
import styles from "./RightBar.module.css";

const RightBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.people}>
        <h2>Discover People</h2>
        <div
          style={{
            width: "100%",
            height: "400px",
            backgroundColor: "#222",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        ></div>
      </div>
      <div className={styles.communities}>
        <h2 style={{ marginTop: "20px" }}>Discover Communities</h2>
        <div
          style={{
            width: "100%",
            height: "400px",
            backgroundColor: "#222",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default RightBar;
