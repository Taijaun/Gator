import { createUser, getUserByName } from "src/db/queries/users.js";
import { setUser } from "../config.js"

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>

export async function handlerLogin(cmdName: string, ...args: string[]){
    if (args.length === 0){
        throw new Error("login handler expects a single argument, username.")
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
        handlerFunc(cmdName, ...args);
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
        console.log("New user created.");
        console.log(newUser);
    } else {
        throw new Error("User already exists")
    }
}