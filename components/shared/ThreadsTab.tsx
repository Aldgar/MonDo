/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchUserPost } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
interface LocalParams {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

const ThreadsTab = async ({
    currentUserId,
    accountId,
    accountType,
} : LocalParams) => { 
    
    const results = await fetchUserPost(accountId);
    if (!results || !results.threads) redirect('/');

    return (
        <section className="mt-9 flex flex-col gap-10">
            {results.threads.map((thread: any) => (
            <ThreadCard 
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            author={
                accountType === 'User'
                ? { name:results.name, id:results.id, image: results.image }:
                { name: thread.author.name, id: thread.author.id, image: thread.author.image }
            }
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            />
            ))}
        </section>
    )

}

export default ThreadsTab;