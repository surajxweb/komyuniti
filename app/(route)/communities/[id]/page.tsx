import { fetchCommunity } from "@/lib/actions/community.actions";
import styles from "./Comminity.module.css";
import Image from "next/image";
import BackButton from "@/components/client/BackButton";

const CommunityPage = async ({ params }: { params: { id: string } }) => {
  const communityInfo = await fetchCommunity(params.id);
  console.log(communityInfo);

  return (
    <div className={styles.container}>
      <BackButton />
      {communityInfo ? (
        <div className={styles.commProfile}>
          <div className={styles.image}>
            <Image
              src={communityInfo?.header_image}
              alt="header image"
              height={400}
              width={600}
            />
          </div>
          <h1
            style={{ backgroundColor: `${communityInfo?.themeColor}` }}
            className={styles.heading}
          >
            {communityInfo?.name}
          </h1>
          <div className={styles.bio}>{communityInfo?.bio}</div>
        </div>
      ) : (
        <div className={styles.error}>Community Not Found!</div>
      )}
      <div className={styles.error}>
        🚧👷‍♂️ Communities are under Construction!
      </div>
    </div>
  );
};

export default CommunityPage;
