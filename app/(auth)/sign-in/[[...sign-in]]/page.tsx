import { SignIn } from "@clerk/nextjs";
import styles from "../../sign-up/[[...sign-up]]/Clerk.module.css";
import Image from "next/image";
import logo from "@/public/images/new_trans_blue.svg";
import {
  Rubik_Wet_Paint,
  Rubik_Mono_One,
  Rubik_Spray_Paint,
  Rubik,
} from "next/font/google";
import Link from "next/link";

const font1 = Rubik_Wet_Paint({ subsets: ["latin"], weight: "400" });
const font2 = Rubik_Mono_One({ subsets: ["latin"], weight: "400" });
const font3 = Rubik_Spray_Paint({ subsets: ["latin"], weight: "400" });
const font4 = Rubik({ subsets: ["latin"], weight: "400" });

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.clerk}>
        <SignIn />
      </div>
      <div className={styles.content}>
        <div className={styles.tags}>
          <div>#BeyondCensorship</div>
          <div>#PrivacyMatters</div>
          <div>#CommunityFirst</div>
        </div>
        <h1 className={font3.className}>No more boundaries,</h1>
        <h1 className={font3.className}>only beautiful bonds!</h1>
        <h2 className={font4.className}>
          Dive into a world where your voice matters. Komyuniti: Redefining
          Social Media, One Community at a Time.
        </h2>
        <div className={styles.link}>
          <Link href={""}>About Us</Link>
          <Link href={""}>Privacy Policy</Link>
          <Link href={""}>Terms and Conditions</Link>
        </div>
      </div>
    </div>
  );
}
