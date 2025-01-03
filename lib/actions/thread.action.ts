/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import path from "path";
//import path from "path";

interface Params {
    text: string;
    author: string;
    communityId: string;
    path: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createThread({ text, author, communityId, path }: Params) {
    connectToDB();
    const createdThread = await Thread.create({
        text,
        author,
        community: null,
    });

    //update user modle
    await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id },
    });

    revalidatePath(path);
}


export async function fetchPosts (pageNumber = 1, pageSize = 20) {
    connectToDB();

    const skipAmunt = (pageNumber - 1) * pageSize;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const postQuery = Thread.find({
        parentId: { $in: [null, undefined]}})
        .sort({ createdAt: 'desc' })
        .skip(skipAmunt)
        .limit(pageSize)
        .populate({ path: 'author', model: User })
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"
            }
            })
            const totalPostsCount = await Thread.countDocuments({
                parentId: { $in: [null, undefined] },
            });
            const posts = await postQuery.exec();

            const isNext = totalPostsCount > skipAmunt + posts.length;

            return { posts, isNext };
}

export async function fetchThreadById(id: string) {
    connectToDB();

    //TODO: Populate Community

    try {
        const thread = await Thread.findById(id)
        .populate({ 
            path: 'author', 
            model: User, 
            select: "_id id name image"
        })
        
        .populate({
            path: 'children',
            populate: [
                {
                    path: 'author',
                    model: User,
                    select: "_id id name parrnyId image"
                }, 
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                }
            }
            ]
        }). exec();
        return thread;
    } catch (error : any) {
        throw new Error(`Error fetching thread by id: ${error.message}`);
    }
}

export async function addCommentToThread(
threadId: string, commentText: string, userId: string, pathname: string,
) { 
    connectToDB();

    try {
        const originalThread = await Thread.findById(threadId);

        if (!originalThread) {
            throw new Error("Thread not found");
        }
            
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        });

        const savedComment = await commentThread.save();

        originalThread.children.push(savedComment._id);
        
        await originalThread.save();
        
        revalidatePath(path.join('/thread', threadId));

    } catch (error : any) {
        throw new Error(`Error adding comment to thread: ${error.message}`);
    }

}