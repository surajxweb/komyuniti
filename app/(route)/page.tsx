import Image from "next/image";
import styles from "./page.module.css";
import { UserButton } from "@clerk/nextjs";

export const metadata = {
  title: "Home / Komyuniti",
  description: "Making social media more prive and community focused.",
};

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Timeline</h1>
      <div className={styles.post}></div>
      <div className={styles.post}></div>
      <div className={styles.post}></div>
    </div>
  );
}
