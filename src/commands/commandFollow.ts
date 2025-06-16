import { readConfig } from "src/config";
import { createFeedFollow, doesUserFollowFeed, getSingleFeedByUrl } from "src/db/queries/feeds";
import { getUserByName } from "src/db/queries/users";
import { feedFollows, User } from "src/db/schema";


export async function handlerFollow(cmdName: string, user: User, ...args: string[]){
    if (args.length != 1) {
        throw new Error(`usage: ${cmdName}  <url>`);
    }
    
    const url = args[0]
    let feedUUID = await getSingleFeedByUrl(url);

    console.log("User UUID:", user.id);
    console.log("Feed UUID:", feedUUID);

    const userAlreadyFollows = await doesUserFollowFeed(user.id, feedUUID.id);

    if (userAlreadyFollows){
        return;
    }
      

    await createFeedFollow(user.id, feedUUID.id);

    console.log(`user: ${user.name}, feed: ${feedUUID.name}`);
}