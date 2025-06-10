import { readConfig } from "src/config";
import { db } from "../index";
import { feeds, users, feedFollows } from "../schema";
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

export async function createFeedFollow(userId: string, feedId: string) {
    const [newFeedFollow] = await db.insert(feedFollows).values({userId: userId, feedId: feedId}).returning();

    const result = await db.select({
        feedFollowsId: feedFollows.id,
        feedFollowsCreatedAt: feedFollows.createdAt,
        feedFollowsUpdatedAt: feedFollows.updatedAt,
        feedsName: feeds.name,
        feedsId: feeds.id,
        usersId: users.id,
    })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.id, newFeedFollow.id));
}

