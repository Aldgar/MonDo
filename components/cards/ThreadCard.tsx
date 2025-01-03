/* eslint-disable @typescript-eslint/no-unused-vars */
import { Params as NextParams } from "next/dist/server/request/params";
import Link from "next/link";
import Image from "next/image";

interface ThreadCardParams {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        id: string;
        name: string;
        image: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
        
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        }
    } [],
    isComment?: boolean;
    }


const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
    } : ThreadCardParams) => {
    return (
        <article className={`flext w-full flex-col rounded-xl ${isComment ? "px-0 xs:px-7" : " bg-dark-2 p-7"} `}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="">
                        <Link href={`/profile/${author.id}`} className="reletive h-11 w-11">
                        <Image 
                        src={author.image}
                        alt="profile image"
                        width={40} 
                        height={40} 
                        className="cursur-pointer rounded-full"
                        />
                        </Link>
                        <div className="thread-card_bar">
                        </div>
                        <div className="flex w-full flex-col">
                           <Link href={`/profile/${author.id}`} className="w-fit">
                           <h4 className="cursor-pointer text-base-simibold text-light-1">{author.name}</h4>
                           </Link> 
                           <p className="text-small-regular text-light-2">{content}</p>
                           <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
                                <div className="flex gap-3.5">
                                    <Image src="/assets/heart-gray.svg" alt="heart icon"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                    />
                                    <Link href={`/thread/${id}`}>
                                    <Image src="/assets/repost.svg" alt="repost icon"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                    />
                                    </Link>
                                    <Image src="/assets/reply.svg" alt="reply icon"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                    />
                                    <Image src="/assets/share.svg" alt="share icon"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                    />
                                </div>
                                {isComment && comments.length > 0 && (
                                    <Link href={`/thread/${id}`}>
                                        <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
                                    </Link>
                                    )}
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ThreadCard;