import { setUser } from "../config.js"

export type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>

export function handlerLogin(cmdName: string, ...args: string[]){
    if (args.length === 0){
        throw new Error("login handler expects a single argument, username.")
    }

    setUser(args[0])
    console.log(`User has been set to ${args[0]}`);
}

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler){
    registry[cmdName] = handler;
}

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    if (cmdName in registry){
        const handlerFunc = registry[cmdName];
        handlerFunc(cmdName, ...args);
    } else {
        throw new Error("Incorrect command");
    }
}