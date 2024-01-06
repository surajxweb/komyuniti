import styles from "./Search.module.css";
import Search from "@/components/forms/Search";

export const metadata = {
  title: "Search / Komyuniti",
  description: "Making social media more private and community focused.",
};

export default function Page() {
  return (
    <div className={styles.container}>
      {/* <h1 className={styles.heading}>Search for people on Komyunity</h1> */}
      <Search type={"user"} />
    </div>
  );
}
