import { createUser, getUserByName, getUsers } from "src/db/queries/users.js";
import { readConfig, setUser } from "../config.js"
import { db } from "src/db/index.js";
import { sql } from "drizzle-orm";
import { fetchFeed } from "src/rss/feed.js";
import { createFeed, getFeedByUrl } from "src/db/queries/feeds.js";
import { Feed, User } from "src/db/schema.js";


export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>

export async function handlerLogin(cmdName: string, ...args: string[]){
    if (args.length === 0){
        throw new Error("login handler expects a single argument, username.")
    }

    const userExists = await getUserByName(args[0]);
    if (!userExists){
        throw new Error("You can't login to an account that doesn't exist!");
    }

    setUser(args[0])
    console.log(`User has been set to ${args[0]}`);
}

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

export async function handlerRegister(cmdName: string, ...args: string[]){

    if (args.length === 0){
        throw new Error ("Login handler expects a username");
    } 
    
    const userExists = await getUserByName(args[0]);

    if (!userExists){
        const newUser = await createUser(args[0]);
        setUser(args[0]);
        console.log(`New user created: ${args[0]}`);
    } else {
        throw new Error("User already exists")
    }
}

export async function handlerReset(cmdName: string, ...args: string[]) {
    if (args.length > 0){
        console.log("Reset does not require any arguments.");
        process.exit(1);
    }
    await db.execute(sql`TRUNCATE TABLE feeds, users CASCADE`);
    
    console.log("Db cleared");
    process.exit(0);
}

export async function handlerUsers(cmdName: string, ...args: string[]) {
    const users = await getUsers();
    const currentUser = readConfig().currentUserName;


    for (const name of users) {
        if (name.name === currentUser){
            console.log(`* ${name.name} (current)`);
        } else {
            console.log(`* ${name.name}`);
        }
    }
}

export async function handlerAgg(cmdName: string, ...args: string[]){
    const url = "https://www.wagslane.dev/index.xml";
    const feed = await fetchFeed(url);

    for (const title of feed.channel.item){
        console.log(title);
    };
}

export async function handlerAddFeed(cmdName: string, ...args: string[]){
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }

    const feedLength = await getFeedByUrl(args[1]);

    if (feedLength > 0) {
        throw new Error("This feed already exists in the db");
    }

    const user = readConfig();
    const loggedInUsername = user.currentUserName;
    let loggedInUserId;
    let userObj;
    
    if (typeof(loggedInUsername) === "string") {
        userObj = await getUserByName(loggedInUsername);
        if (!userObj){
            throw new Error("User does nto exist");
        }
        loggedInUserId = userObj.id
    } else {
        return;
    }
    
    

    const feed = await createFeed(args[0], args[1], loggedInUserId);
    if (!feed){
        throw new Error("Failed to create feed");
    }

    console.log("Feed created.");
    printFeed(feed, userObj);
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}