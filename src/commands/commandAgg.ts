import { fetchFeed } from "src/rss/feed";

export async function handlerAgg(cmdName: string, ...args: string[]){
    const url = "https://www.wagslane.dev/index.xml";
    const feed = await fetchFeed(url);

    for (const title of feed.channel.item){
        console.log(title);
    };
}