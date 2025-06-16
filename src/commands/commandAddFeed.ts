import { getFeedsByUrl, createFeed, createFeedFollow } from "src/db/queries/feeds";
import { readConfig } from "src/config";
import { getUserByName } from "src/db/queries/users";
import { Feed, User } from "src/db/schema";

export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]){
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }

    const feedLength = await getFeedsByUrl(args[1]);

    if (feedLength.length > 0) {
        throw new Error("This feed already exists in the db");
    }

    const feed = await createFeed(args[0], args[1], user.id);
    if (!feed){
        throw new Error("Failed to create feed");
    }

    await createFeedFollow(user.id, feed.id);

    console.log("Feed created.");
    printFeed(feed, user);
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}