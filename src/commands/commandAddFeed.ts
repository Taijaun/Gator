import { getFeedByUrl, createFeed } from "src/db/queries/feeds";
import { readConfig } from "src/config";
import { getUserByName } from "src/db/queries/users";
import { Feed, User } from "src/db/schema";

export async function handlerAddFeed(cmdName: string, ...args: string[]){
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }

    const feedLength = await getFeedByUrl(args[1]);

    if (feedLength > 0) {
        throw new Error("This feed already exists in the db");
    }

    const user = readConfig();
    const loggedInUsername = user.currentUserName;
    let loggedInUserId;
    let userObj;
    
    if (typeof(loggedInUsername) === "string") {
        userObj = await getUserByName(loggedInUsername);
        if (!userObj){
            throw new Error("User does nto exist");
        }
        loggedInUserId = userObj.id
    } else {
        return;
    }
    
    

    const feed = await createFeed(args[0], args[1], loggedInUserId);
    if (!feed){
        throw new Error("Failed to create feed");
    }

    console.log("Feed created.");
    printFeed(feed, userObj);
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}