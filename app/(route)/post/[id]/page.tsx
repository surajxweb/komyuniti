import { fetchPostsByUserId, findPostById } from "@/lib/actions/post.actions";
import styles from "./PostPage.module.css";
import { currentUser } from "@clerk/nextjs";
import PostCard from "@/components/cards/PostCard";
import BackButton from "@/components/client/BackButton";
import MakeAComment from "@/components/forms/MakeAComment";
import { fetchUser } from "@/lib/actions/user.actions";
import NewCard from "@/components/cards/NewCard";
import Comments from "@/components/display/Comments";

const PostPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const userInfo = await fetchUser(user?.id || "");

  const post = await findPostById(params.id);
  if (!post) return <div className={styles.error}>Post not found.</div>;
  console.log("ye lo tumhara post ka comment: ", post.children);

  const comments = post.children;
  const likes = post.likes;

  const isMyPost = user?.id === post?.author.id;

  return (
    <div className={styles.container}>
      <BackButton />
      <PostCard
        key={post._id}
        id={post._id.toString()}
        currentUserId={user?.id}
        parentId={post.parentId}
        content={post.text}
        community={post.community}
        createdAt={post.createdAt}
        comments={comments}
        likes={post.likes}
        author_id={post.author.id}
        author__id={post.author._id.toString()}
        author_name={post.author.name}
        author_username={post.author.username}
        author_image={post.author.image}
      />

      {/* <NewCard past={JSON.stringify(post)} /> */}

      <MakeAComment
        postId={post._id.toString()}
        currentUserImage={userInfo.image}
        currentUserId={userInfo._id.toString()}
      />
      {comments.length === 0 ? (
        <div className={styles.description}>
          No replies yet. Drop a comment to start a converstation.
        </div>
      ) : (
        <div className={styles.mainCommentBox}>
          {comments.map((comment: any) => (
            <Comments
              key={comment._id}
              id={comment._id.toString()}
              author={comment.author}
              comments={comment.children}
              content={comment.text}
              createdAt={comment.createdAt.toString()}
              likes={comment.likes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostPage;
