import { scrapeFeeds } from "src/db/queries/feeds";
import { fetchFeed } from "src/rss/feed";

export async function handlerAgg(cmdName: string, ...args: string[]){
    const timeBetweenReqsStr = args[0] ?? "30s";
    const timebetweenReqs = parseDuration(timeBetweenReqsStr);

    console.log(`Collecting feeds every ${timeBetweenReqsStr}`);
    scrapeFeeds()

    const interval = setInterval(() => {
            scrapeFeeds().catch(console.error);
        }, timebetweenReqs);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
}

function parseDuration(durationStr: string): number {
    if (typeof durationStr !== "string"){
        throw new Error("Duration string is required.");
    }
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);

    if (!match) {
        throw new Error("Invalid furation format");
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case "ms":
            return value;
        case "s":
            return value * 1000;
        case "m":
            return value * 60 * 1000;
        case "h":
            return value * 60 * 60 * 1000;
        default:
            throw new Error("Invalid time unit");
    }
}