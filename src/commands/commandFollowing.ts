import { readConfig } from "src/config";
import { getFeedFollowsForUser } from "src/db/queries/feeds";
import { getUserByName } from "src/db/queries/users";

export async function handlerFollowing(cmdName: string, ...args: string[]){
    const user = readConfig()
    const LoggedInUsername = user.currentUserName;
    let userUUID;

    if (typeof(LoggedInUsername) === "string"){
        userUUID = await getUserByName(LoggedInUsername);
    } else {
        throw new Error("No user to check");
    }

    const feeds = await getFeedFollowsForUser(userUUID.id);

    for (const feed of feeds){
        console.log(feed.feedsName);
    }

}