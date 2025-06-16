import { db } from "../index";
import { eq, and, sql } from "drizzle-orm";
import { Post, posts } from "../schema";
import { getSingleFeedByUrl } from "./feeds";

export async function createPost(post: Post){

    try {
        const result = await db.insert(posts).values(post);
    } catch (error) {
        console.log(error)
    }

    console.log("Post added")
}