import styles from "./Profile.module.css";

const fetchUserDetails = async (id: string) => {
  try {
  } catch (e) {
    console.log("Failed to fetch user data - ", e);
    return null;
  }
};

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const user = await fetchUserDetails(params.id);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Profile of {params.id}</div>{" "}
    </div>
  );
};

export default ProfilePage;
