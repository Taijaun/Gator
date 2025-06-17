import { getPostsForUser } from "src/db/queries/posts";
import { User } from "src/db/schema";

export async function handlerBrowse(cmdName: string, user: User, ...args: string[]){
    let limit = args.length === 0 ? 2 : Number(args[0]);

    if (Number.isNaN(limit)) {
        throw new Error("Limit must be a valid number.");
    }

    const posts = await getPostsForUser(limit, user.id);

    for (const post of posts){
        console.log(`${post.id} - ${post.title}`)
    }
}