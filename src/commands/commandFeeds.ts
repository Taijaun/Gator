import { db } from "src/db";
import { eq, sql } from "drizzle-orm";
import { feeds, users } from "src/db/schema";

export async function handlerFeeds(cmdName: string, ...args: string[]){
    const result = await db.select().from(feeds);

    for (const feed of result){
        const [user] = await db.select().from(users).where(eq(users.id, feed.userId));
        
        console.log(feed.name);
        console.log(feed.url);
        console.log(user.name)
        
    }

}