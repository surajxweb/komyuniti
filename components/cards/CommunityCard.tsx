import Image from "next/image";
import styles from "./CommunityCard.module.css";
const CommunityCard = ({
  name,
  image,
  id,
  themeColor,
}: {
  name: string;
  image: string;
  id: string;
  themeColor: string;
}) => {
  console.log(themeColor);

  return (
    <div className={styles.main} style={{ border: `1px solid ${themeColor}` }}>
      <Image src={image} height={200} width={300} alt="commmunity poster" />
      <div style={{ backgroundColor: `${themeColor}` }} className={styles.name}>
        {name}
      </div>
    </div>
  );
};

export default CommunityCard;
