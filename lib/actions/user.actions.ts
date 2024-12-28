/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidatePath } from "next/cache";
import { FilterQuery, SortOrder } from "mongoose";
import user from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import { User } from "@clerk/nextjs/server";

interface UserParams {
    userId: string;
    name: string;
    username: string;
    bio: string;
    image: string;
    path: string;
}
export async function updateUser({
    userId,
    name,
    username,
    bio,
    image,
    path,
} : UserParams): Promise<void> {
    connectToDB();
 try {    await user.findOneAndUpdate(
    { id: userId },
    {
        name,
        username: username.toLowerCase(),
        bio,
        image,
        onboarding: true,
    } , { upsert: true }
);
if(path === '/profile/edit') {
    revalidatePath(path);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error: any) {
    throw new Error (`Failed to create user: ${error.message}`);
}
}

export async function fetchUser(userId: string) {
    try { 
        connectToDB();
    return await user.findOne({ id: userId });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error:any) {
        throw new Error (`Failed to fetch user: ${error.message}`);
    } }


    export async function fetchUserPost(userId: string) {
        try {
            connectToDB();
            const threads = await user.findOne({ id: userId }).populate({
                path: 'threads',
                model: 'Thread',
                populate: {
                    path: 'children',
                    model: 'Thread',
                    populate: {
                        path: 'author',
                        model: 'User',
                        select: 'name id image',
            }
        }

        })
        return threads;
        
        } catch (error: any) {
            throw new Error (`Failed to fetch user posts: ${error.message}`);
        }
    }


    export async function fetchUsers({
        userId, 
        searchString = '',
        pageNumber = 1,
        pageSize = 10,
        sortBy = 'desc',
    }: {
        userId: string;
        searchString?: string;
        pageNumber?: number;
        pageSize?: number;
        sortBy?: SortOrder;
    }) {

        try {
            connectToDB();
             const skipAmount = (pageNumber - 1) * pageSize;
             const regex = new RegExp(searchString, 'i');
             const query: FilterQuery<typeof User> = {
                id: { $ne: userId }
             }

             if (searchString.trim() !== '') {
                 query.$or = [
                     { username: { $regex: regex } },
                     { name: { $regex: regex } },
                 ];
             }
             const sortOptions = { createdAt: sortBy };
             const userQuery = user.find(query)
                .sort(sortOptions)
                .skip(skipAmount)
                .limit(pageSize);

                const totalUsersCount = user.countDocuments(query);
                const users = await userQuery.exec();
                const isNext = await totalUsersCount > skipAmount + users.length;
                return { users, isNext };
        } catch (error: any) {
            throw new Error (`Failed to fetch users: ${error.message}`);
    }
}

export async function getActivity(userId: string) {
    try {
        connectToDB();

        const userThreads = await Thread.find({ author: userId });

        const childThreads = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children);
        }, []);

        const replies = await Thread.find({
            _id: { $in: childThreads },
            author: { $ne: userId },
        }) .populate({
            path: 'author',
            model: 'User',
            select: 'name id image',
    })
        return replies;   
    } catch (error: any) {
        throw new Error (`Failed to fetch activity: ${error.message}`);
    }
}
