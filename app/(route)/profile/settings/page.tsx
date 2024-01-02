"use client";

import React from "react";
import { UserProfile } from "@clerk/nextjs";
import styles from "./UserPage.module.css";
import { dark } from "@clerk/themes";

const UserPage = () => {
  return (
    <div className={styles.container}>
      <UserProfile  appearance={{
        baseTheme: dark
      }} />
    </div>
  );
};

export default UserPage;