import { db } from "src/db";
import { eq} from "drizzle-orm";
import { feeds, users } from "src/db/schema";

export async function handlerFeeds(cmdName: string, ...args: string[]){
    const result = await db.select({
        feedName: feeds.name,
        feedUrl: feeds.url,
        userName: users.name
    })
    .from(feeds)
    .innerJoin(users, eq(feeds.userId, users.id));

    for (const {feedName, feedUrl, userName} of result){
        console.log(feedName);
        console.log(feedUrl);
        console.log(userName);
    }

}