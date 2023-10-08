import logo from "@/resources/logo3.webp";
import styles from "./LeftBar.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  SignedIn,
  SignOutButton,
  SignInButton,
  SignedOut,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineLogin } from "react-icons/hi";
import { HiHome } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { HiUser } from "react-icons/hi";
import { BiMessageAltDots } from "react-icons/bi";
import { dark } from "@clerk/themes";

const TopBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href={"/"}>
          <Image src={logo} height={253.125} width={450} alt='logo' />
        </Link>
      </div>
      <div className={styles.nav}>
        <Link href={"/"} className={`${styles.link} ${styles.selected}`}>
          <HiHome size='2em' className={styles.icons} />
          <div className={styles.options}>Home</div>
        </Link>
        <Link href={"/"} className={styles.link}>
          <HiSearch size='2em' className={styles.icons} />
          <div className={styles.options}>Search</div>
        </Link>
        <Link href={"/"} className={styles.link}>
          <HiOutlineHeart size='2em' className={styles.icons} />
          <div className={styles.options}>Activity</div>
        </Link>
        <Link href={"/"} className={styles.link}>
          <BiMessageAltDots size='2em' className={styles.icons} />
          <div className={styles.options}>Messages</div>
        </Link>
        <Link href={"/"} className={styles.link}>
          <IoCreateOutline size='2em' className={styles.icons} />
          <div className={styles.options}>Create Post</div>
        </Link>
        <Link href={"/"} className={styles.link}>
          <MdGroups size='2em' className={styles.icons} />
          <div className={styles.options}>Communities</div>
        </Link>
        <Link href={"/"} className={styles.link}>
          <HiUser size='2em' className={styles.icons} />
          <div className={styles.options}>Profile</div>
        </Link>
      </div>
      <div className={styles.logout}>
        <SignedIn>
          <SignOutButton>
            <div className={`${styles.link} ${styles.logout}`}>
              <HiOutlineLogout size='2em' className={styles.icons} />
              <div className={styles.options}>Logout</div>
            </div>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <div className={`${styles.link}`}>
              <HiOutlineLogin size='2em' className={styles.icons} />
              <div className={styles.options}>Login</div>
            </div>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default TopBar;
