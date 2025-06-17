import { getPostsForUser } from "src/db/queries/posts";
import { User } from "src/db/schema";

export async function handlerBrowse(cmdName: string, user: User, ...args: string[]){
    let limit = args.length === 0 ? 2 : Number(args[0]);

    if (Number.isNaN(limit)) {
        throw new Error("Limit must be a valid number.");
    }

    if (limit <= 0){
        throw new Error("Limit must be at least 1");
    }

    const posts = await getPostsForUser(limit, user.id);

    if(posts.length === 0){
        console.log("There are no posts");
        return;
    }

    for (const post of posts){
        console.log(`${post.title} - ${post.url}`);
    }
}