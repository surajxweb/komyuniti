import Image from "next/image";
import styles from "./page.module.css";
import { UserButton } from "@clerk/nextjs";
import { fetchPosts } from "@/lib/actions/post.actions";
import PostCard from "@/components/cards/PostCard";

export const metadata = {
  title: "Home / Komyuniti",
  description: "Making social media more prive and community focused.",
};



export default async function Home() {
  const posts = await fetchPosts();
  
  // console.log("ittne saare posts: ", posts);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Timeline</h1>
      {posts?.map((post : any) => (
    <PostCard key={post._id} content={post}/>
  ))}
    </div>
  );
}
