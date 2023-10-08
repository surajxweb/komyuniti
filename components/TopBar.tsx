import logo from "@/resources/logo.webp";
import styles from "./TopBar.module.css";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import { HiOutlineLogout } from "react-icons/hi";
import { dark } from "@clerk/themes";

const TopBar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href={"/"}>
          <Image src={logo} height={253.125} width={450} alt='logo' />
        </Link>
      </div>
      <div className={styles.actions}>
        <SignedIn>
          <SignOutButton>
            <HiOutlineLogout className={styles.icon} size='2em' />
          </SignOutButton>
        </SignedIn>
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default TopBar;
