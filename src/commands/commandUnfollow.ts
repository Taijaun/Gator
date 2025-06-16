import { deleteFollowRecord, getFeedsByUrl, getSingleFeedByUrl } from "src/db/queries/feeds";
import { User } from "src/db/schema";


export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]){

    const feed = await getSingleFeedByUrl(args[0]);

    if (!feed){
        throw new Error(`Feed with url: ${args[0]} does not exist`);
    }


    await deleteFollowRecord(user.id, feed.id);
}