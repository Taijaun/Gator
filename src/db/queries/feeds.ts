import { readConfig } from "src/config";
import { db } from "../index";
import { feeds } from "../schema";
import { eq } from "drizzle-orm";
import { firstOrUndefined } from "./utility";

export async function getFeedByUrl(url: string){
    const result = await db.select().from(feeds).where(eq(feeds.url, url));

    return result.length;
}

export async function createFeed(
  feedName: string,
  url: string,
  userId: string,
) {
  const result = await db
    .insert(feeds)
    .values({
      name: feedName,
      url,
      userId,
    })
    .returning();

    return firstOrUndefined(result);
}

