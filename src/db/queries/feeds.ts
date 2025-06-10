import { readConfig } from "src/config";
import { db } from "../index";
import { feeds } from "../schema";
import { eq } from "drizzle-orm";
import { getUserByName } from "./users";

export async function addFeed(name: string, url: string){
    const feedLength = await getFeedByUrl(url);
    const loggedInUsername = readConfig().currentUserName;
    let loggedInUserId;

    if (typeof(loggedInUsername) === "string") {
        const userObj = await getUserByName(loggedInUsername);
        loggedInUserId = userObj.id
    } else {
        return;
    }

    if (feedLength > 0) {
        console.log("This feed already exists in the db");
        return;
    }

    const [result] = await db.insert(feeds).values({name: name, url: url, userId: loggedInUserId}).returning();
    return result;

}

async function getFeedByUrl(url: string){
    const result = await db.select().from(feeds).where(eq(feeds.url, url));

    return result.length;
}