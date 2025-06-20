import ThreadCard from "@/components/cards/ThreadCard";
import AnimatedLogo from "@/components/shared/AnimatedLogo";
import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  console.log(result);
  return (
    <>
      <AnimatedLogo />
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No Threads Found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
