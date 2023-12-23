import Image from "next/image";
import styles from "./page.module.css";
import messages_svg from "@/public/images/message.svg";

export default async function Messages() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Messages (Coming Soon) !</h1>
      <div className={styles.image}>
        <Image src={messages_svg} alt="message svg" height={500} width={500} />
      </div>
    </div>
  );
}
