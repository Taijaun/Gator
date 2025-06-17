import { db } from "../index";
import { eq, and, sql, desc } from "drizzle-orm";
import { feedFollows, Post, posts } from "../schema";
import { getSingleFeedByUrl } from "./feeds";

export async function createPost(post: Post){

    try {
        const result = await db.insert(posts).values(post);
        console.log("Post added")
        return result;
    } catch (error) {
        console.log("Failed to add post:", error)
    }

    console.log("Post added")
}


export async function getPostsForUser(limit: number, userId: string){
    const result = db.select({
        url: posts.url,
        title: posts.title,
    })
    .from(posts).innerJoin(feedFollows, eq(posts.feedId, feedFollows.feedId))
    .where(eq(feedFollows.userId, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit)

    return result;
    
}