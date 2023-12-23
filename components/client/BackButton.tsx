"use client";
import styles from "./BackButton.module.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <button className={styles.button} onClick={goBack}>
      <IoArrowBackSharp size='1.3em' color='#ccc' />
    </button>
  );
};

export default BackButton;
