"use client";
import styles from "./BackButton.module.css";
import { MdKeyboardBackspace  } from "react-icons/md";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <button className={styles.button} onClick={goBack}>
      <MdKeyboardBackspace size="1.3em" color="#ccc" />
    </button>
  );
};

export default BackButton;
