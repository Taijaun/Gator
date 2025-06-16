import { readConfig } from "src/config";
import { db } from "../index";
import { feeds, users, feedFollows } from "../schema";
import { eq, and } from "drizzle-orm";
import { firstOrUndefined } from "./utility";

export async function getFeedsByUrl(url: string){
    const result = await db.select().from(feeds).where(eq(feeds.url, url));

    return result;
}

export async function getSingleFeedByUrl(url: string){
    const [result] = await db.select().from(feeds).where(eq(feeds.url, url));

    return result;
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

    const [result] = await db.select({
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
    .where(and (
        eq(feedFollows.id, newFeedFollow.id),
        eq(users.id, newFeedFollow.userId)
    ))
    

    return result;
}

export async function getFeedFollowsForUser(userId: string){

    const result = await db.select({
        feedFollows: feedFollows.id,
        usersName: users.name,
        feedsName: feeds.name
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.userId, userId))

    return result;

}

export async function doesUserFollowFeed(userId: string, feedId: string){

    const result = await db.select().from(feedFollows).where(and(
        eq(feedFollows.userId, userId),
        eq(feedFollows.feedId, feedId)
    ));

    if (result.length == 0){
        return false;
    } else {
        return true;
    }
}

export async function deleteFollowRecord(userId: string, feedId: string){

    const result = await db.delete(feedFollows).where(and(
        eq(feedFollows.userId, userId),
        eq(feedFollows.feedId, feedId)
    ))
    .returning()
}

