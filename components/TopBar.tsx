import logo from "@/resources/komyuniti_white.webp";
import styles from "./TopBar.module.css";
import Image from "next/image";
import Link from "next/link";
import { HiPencil } from "react-icons/hi";
import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import { HiOutlineLogout } from "react-icons/hi";
import { dark } from "@clerk/themes";
import { HiUser } from "react-icons/hi";

const TopBar = () => {
  return (
    <nav className={styles.container}>
      <Link href={"/"} className={styles.link}>
        <HiPencil size='2em' className={styles.icons} />
      </Link>
      <div className={styles.logoContainer}>
        <Link href={"/"}>
          <Image src={logo} height={253.125} width={450} alt='logo' />
        </Link>
      </div>
      <Link href={"/"} className={styles.link}>
        <HiUser size='2em' className={styles.icons} />
      </Link>
    </nav>
  );
};

export default TopBar;
