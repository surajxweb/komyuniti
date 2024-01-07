"use client";
import styles from "./BottomMenu.module.css";
import Link from "next/link";

import { fetchUser } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  MdHome,
  MdOutlineSearch,
  MdPostAdd,
  MdAccountCircle,
  MdOutlineNotifications,
  MdOutlineNotificationsActive,
  MdNotifications,
  MdSearch,
  MdOutlineHome,
} from "react-icons/md";

const Bottom = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [userData, setUserData] = useState({ username: "", imageUrl: "" });

  useEffect(() => {
    const getUserData = async () => {
      const userInfo = await fetchUser(userId || "");
      setUserData({ username: userInfo?.username, imageUrl: userInfo?.image });
    };
    getUserData();
  }, [userId]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: scrollDirection === "up" ? "#111111e9" : "#1111118f",
      }}
    >
      <div className={styles.nav}>
        <Link
          href={"/"}
          className={`${styles.link} ${
            pathname === "/" ? styles.selected : ""
          }`}
        >
          {pathname === "/" ? (
            <MdHome size="2em" className={styles.icons} />
          ) : (
            <MdOutlineHome size="2em" className={styles.icons} />
          )}
        </Link>
        <Link
          href={"/search"}
          className={`${styles.link} ${
            pathname === "/search" ? styles.selected : ""
          }`}
        >
          {pathname === "/" ? (
            <MdSearch size="2em" className={styles.icons} />
          ) : (
            <MdOutlineSearch size="2em" className={styles.icons} />
          )}
        </Link>
        <Link
          href={"/create-post"}
          className={`${styles.link} ${
            pathname === "/create-post" ? styles.selected : ""
          }`}
        >
          <MdPostAdd size="2em" className={styles.icons} />
        </Link>
        <Link
          href={"/notifications"}
          className={`${styles.link} ${
            pathname === "/notifications" ? styles.selected : ""
          }`}
        >
          {pathname === "/notifications" ? (
            <MdNotifications
              MdOutlineNotifications
              size="2em"
              className={styles.icons}
            />
          ) : 0 ? (
            <MdOutlineNotificationsActive size="2em" className={styles.icons} />
          ) : (
            <MdOutlineNotifications size="2em" className={styles.icons} />
          )}
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
            <MdAccountCircle size="2em" className={styles.icons} />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Bottom;
