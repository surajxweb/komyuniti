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
      <h1>Your Timeline</h1>
      <div
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "#222",
          borderRadius: "20px",
          marginTop: "20px",
        }}
      ></div>
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
  );
}
