import { createUser, getUserByName, getUsers } from "src/db/queries/users.js";
import { readConfig, setUser } from "../config.js"
import { db } from "src/db/index.js";
import { sql } from "drizzle-orm";
import { fetchFeed } from "src/rss/feed.js";
import { createFeed, getFeedByUrl } from "src/db/queries/feeds.js";
import { Feed, User } from "src/db/schema.js";


export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>


export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler){
    registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    if (cmdName in registry){
        const handlerFunc = registry[cmdName];
        await handlerFunc(cmdName, ...args);
    } else {
        throw new Error("Incorrect command");
    }
}







