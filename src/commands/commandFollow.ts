import { readConfig } from "src/config";
import { createFeedFollow, getSingleFeedByUrl } from "src/db/queries/feeds";
import { getUserByName } from "src/db/queries/users";
import { feedFollows, User } from "src/db/schema";


export async function handlerFollow(cmdName: string, ...args: string[]){
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName}  <url>`);
    }
    const user = readConfig()
    const LoggedInUsername = user.currentUserName
    let userUUID;

    if (typeof(LoggedInUsername) === "string"){
        userUUID = await getUserByName(LoggedInUsername);
    } else {
        throw new Error("No user to add");
    }
    
    const url = args[0]
    let feedUUID = await getSingleFeedByUrl(url);

    await createFeedFollow(userUUID.id, feedUUID.id);

    console.log(`user: ${userUUID.name}, feed: ${feedUUID.name}`);
}