import { readConfig } from "src/config";
import { getFeedFollowsForUser } from "src/db/queries/feeds";
import { getUserByName } from "src/db/queries/users";
import { User } from "src/db/schema";

export async function handlerFollowing(cmdName: string, user: User, ...args: string[]){

    const feeds = await getFeedFollowsForUser(user.id);

    for (const feed of feeds){
        console.log(feed.feedsName);
    }

}