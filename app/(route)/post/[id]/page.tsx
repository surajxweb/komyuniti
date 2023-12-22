import { findPostById } from "@/lib/actions/post.actions";
import styles from "./PostPage.module.css";
import { currentUser } from "@clerk/nextjs";

const PostPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  const post = await findPostById(params.id);
  if (!post) return <div className={styles.error}>Post not found.</div>;
  console.log("ye lo tumhara post: ", post);

  const comments = post.children;
  const likes = post.likes;

  const description =
    comments.length === 0 && likes.length === 0
      ? "Be the first one to like and start a conversation."
      : likes.length === 0
      ? "Be the first one to like."
      : comments.length === 0
      ? "Be the first one to start a conversation."
      : comments.length !== 0
      ? "Join the conversation."
      : "";

  const isMyPost = user?.id === post?.author.id;

  return (
    <div className={styles.container}>
      {!isMyPost && <div className={styles.description}>{description}</div>}
    </div>
  );
};

export default PostPage;
