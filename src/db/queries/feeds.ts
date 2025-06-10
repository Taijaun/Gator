import { db } from "../index";
import { feeds } from "../schema";
import { eq } from "drizzle-orm";

export async function addFeed(name: string, url: string, userId: string){
    const feedLength = await getFeedByUrl(url)
    if (feedLength > 0) {
        console.log("This feed already exists in the db");
        return;
    }

    const [result] = await db.insert(feeds).values({name: name, url: url, userId: userId}).returning();
    return result;

}

async function getFeedByUrl(url: string){
    const result = await db.select().from(feeds).where(eq(feeds.url, url));

    return result.length;
}