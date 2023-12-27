import styles from "./page.module.css";
import SkPostCard from "@/components/skeletons/SkPostCard";
import Head from "next/head";

export const metadata = {
  title: "Home / Komyuniti",
  description: "Making social media more private and community-focused.",
};

export default async function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Timeline</h1>
      <div>
        <SkPostCard />
        <SkPostCard />
        <SkPostCard />
      </div>
    </div>
  );
}
