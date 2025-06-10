import { XMLParser } from "fast-xml-parser";
import { RSSFeed, RSSItem } from "./rssfeed";

export async function fetchFeed(feedURL: string) {
    const response = await fetch(feedURL, {
        headers: {
            "User-Agent": "gator"
        }
    });

    const textResponse = await response.text();
    const xmlParser = new XMLParser();

    const responseObj = xmlParser.parse(textResponse);

    if (!responseObj.rss || (responseObj.rss && !responseObj.rss.channel)){
        throw new Error("Channel does not exist")
    }

    const channel = responseObj.rss.channel;

    if (!("title" in channel) && !("link" in channel) && !("description"in channel)){
        throw new Error("fields not present in channel");
    }

    const channelTitle = channel.title;
    const channelLink = channel.link;
    const channelDescription = channel.description;
    let channelItem = Array.isArray(channel.item) ? channel.item : [];
    const validRssItems: RSSItem[] = [];

    for (let field of channelItem){
        if (("title" in field) && ("link" in field) && ("description" in field) && ("pubDate" in field)){
            validRssItems.push(field);
        }
    }

    const newChannel = {
        title: channelTitle,
        link: channelLink,
        description: channelDescription,
        item: validRssItems
    };

    const finalObj: RSSFeed = {
        channel: newChannel
    }

    return finalObj;


}
