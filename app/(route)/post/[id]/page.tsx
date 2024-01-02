import { fetchPostsByUserId, findPostById } from "@/lib/actions/post.actions";
import styles from "./PostPage.module.css";
import { currentUser } from "@clerk/nextjs";
import PostCard from "@/components/cards/PostCard";
import BackButton from "@/components/client/BackButton";
import MakeAComment from "@/components/forms/MakeAComment";
import { fetchUser } from "@/lib/actions/user.actions";
import Comments from "@/components/display/Comments";

const PostPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const userInfo = await fetchUser(user?.id || "");
  const mongoId = userInfo?._id;
  const userLikes = userInfo?.likedPosts;
  const userFollowing = userInfo?.following;

  const post = await findPostById(params.id);
  if (!post) return <div className={styles.error}>Post not found.</div>;

  const comments = post.children;
  const likes = post.likes;
  const genz = post.children.children;

  console.log(typeof genz);

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
        mongoId={mongoId}
        userLikes={userLikes}
        userFollowing={userFollowing}
      />

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
              authorString={JSON.stringify(comment.author)}
              commentsString={JSON.stringify(comment.children)}
              content={comment.text}
              createdAt={comment.createdAt.toString()}
              likesString={JSON.stringify(comment.likes)}
              currentUserImage={userInfo.image}
              currentUserId={userInfo._id.toString()}
              mongoId={mongoId}
              userLikes={userLikes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostPage;
