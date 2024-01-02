"use client";

import React from "react";
import { UserProfile } from "@clerk/nextjs";
import styles from "./UserPage.module.css";
import { dark } from "@clerk/themes";
import BackButton from "@/components/client/BackButton";

const UserPage = () => {
  return (
    <div className={styles.container}>
      <BackButton />
      <UserProfile
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
};

export default UserPage;
