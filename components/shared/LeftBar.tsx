"use client";
import logo from "@/public/images/logo3.webp";
import styles from "./LeftBar.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  SignedIn,
  SignOutButton,
  SignInButton,
  SignedOut,
  OrganizationSwitcher,
  useAuth,
} from "@clerk/nextjs";
import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineLogin } from "react-icons/hi";
import { HiHome } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiPencil } from "react-icons/hi";
import { MdGroups } from "react-icons/md";
import { HiUser } from "react-icons/hi";
import { BiMessageAltDots } from "react-icons/bi";
import { dark } from "@clerk/themes";
import { usePathname, useRouter } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";

const LeftBar = () => {
  const { userId } = useAuth();
  const [userData, setUserData] = useState({ username: "", imageUrl: "" });

  useEffect(() => {
    const getUserData = async () => {
      const userInfo = await fetchUser(userId || "");
      setUserData({ username: userInfo?.username, imageUrl: userInfo?.image });
      console.log(userInfo);
    };
    getUserData();
  }, [userId]);

  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href={"/"}>
          <Image src={logo} height={253.125} width={450} alt="logo" />
        </Link>
      </div>
      <div className={styles.nav}>
        <Link
          href={"/"}
          className={`${styles.link} ${
            pathname === "/" ? styles.selected : ""
          }`}
        >
          <HiHome size="2em" className={styles.icons} />
          <div className={styles.options}>Home</div>
        </Link>
        <Link
          href={"/search"}
          className={`${styles.link} ${
            pathname === "/search" ? styles.selected : ""
          }`}
        >
          <HiSearch size="2em" className={styles.icons} />
          <div className={styles.options}>Search</div>
        </Link>
        <Link
          href={"/activity"}
          className={`${styles.link} ${
            pathname === "/activity" ? styles.selected : ""
          }`}
        >
          <HiOutlineHeart size="2em" className={styles.icons} />
          <div className={styles.options}>Activity</div>
        </Link>
        <Link
          href={"/messages"}
          className={`${styles.link} ${
            pathname === "/messages" ? styles.selected : ""
          }`}
        >
          <BiMessageAltDots size="2em" className={styles.icons} />
          <div className={styles.options}>Messages</div>
        </Link>
        <Link
          href={"/create-post"}
          className={`${styles.link} ${
            pathname === "/create-post" ? styles.selected : ""
          }`}
        >
          <HiPencil size="2em" className={styles.icons} />
          <div className={styles.options}>Create Post</div>
        </Link>
        <Link
          href={"/communities"}
          className={`${styles.link} ${
            pathname === "/communities" ? styles.selected : ""
          }`}
        >
          <MdGroups size="2em" className={styles.icons} />
          <div className={styles.options}>Communities</div>
        </Link>
        <Link
          href={
            userData.imageUrl && userData.imageUrl.length > 1
              ? `/${userData.username}`
              : "/profile"
          }
          className={`${styles.link} ${
            pathname === `/${userData.username}` ? styles.selected : ""
          }`}
        >
          {userData.imageUrl && userData.imageUrl.length > 1 ? (
            <Image
              src={userData.imageUrl}
              height={100}
              width={100}
              alt="profile photo"
            />
          ) : (
            <HiUser size="2em" className={styles.icons} />
          )}

          <div className={styles.options}>Profile</div>
        </Link>
      </div>
      <div className={styles.logout}>
        <SignedIn>
          <SignOutButton>
            <div className={`${styles.link} ${styles.logout}`}>
              <HiOutlineLogout size="2em" className={styles.icons} />
              <div className={styles.options}>Logout</div>
            </div>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <div className={`${styles.link}`}>
              <HiOutlineLogin size="2em" className={styles.icons} />
              <div className={styles.options}>Login</div>
            </div>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default LeftBar;
