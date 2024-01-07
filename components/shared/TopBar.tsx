"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import logo from "@/public/images/komyuniti.png";
import styles from "./TopBar.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  MdGroups,
  MdMessage,
  MdOutlineGroups,
  MdOutlineMessage,
} from "react-icons/md";

const TopBar = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevScrollY, setPrevScrollY] = useState(0);
  const pathname = usePathname();
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollDirection("down");
        controls.start({ opacity: 0 });
      } else {
        setScrollDirection("up");
        controls.start({ opacity: 1 });
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY, controls]);

  return (
    <motion.nav
      className={styles.container}
      animate={controls}
      initial={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <Link
        href={"/messages"}
        className={`${styles.link} ${
          pathname === "/messages" ? styles.selected : ""
        }`}
      >
        {pathname === "/messages" ? (
          <MdMessage size="2em" className={styles.icons} />
        ) : (
          <MdOutlineMessage size="2em" className={styles.icons} />
        )}
      </Link>
      <div className={styles.logoContainer}>
        <Link href={"/"}>
          <Image src={logo} height={253.125} width={450} alt="logo" />
        </Link>
      </div>
      <Link
        href={"/communities"}
        className={`${styles.link} ${
          pathname === "/communities" ? styles.selected : ""
        }`}
      >
        {pathname === "/communities" ? (
          <MdGroups size="2em" className={styles.icons} />
        ) : (
          <MdOutlineGroups size="2em" className={styles.icons} />
        )}
      </Link>
    </motion.nav>
  );
};

export default TopBar;
