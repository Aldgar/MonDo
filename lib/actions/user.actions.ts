'use server';

import { revalidatePath } from "next/cache";
import user from "../models/user.model";
import { connectToDB } from "../mongoose";
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