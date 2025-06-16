import { read } from "fs";
import { CommandHandler } from "src/commands/commandHandler";
import { readConfig } from "src/config";
import { getUserByName } from "src/db/queries/users";
import { User } from "src/db/schema";

type UserCommandHandler = (
    cmdName: string,
    user: User,
    ...args: string[]
) => Promise<void>;

type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export function middlewareLoggedIn(handler: UserCommandHandler):CommandHandler{

    return async (cmdName: string, ...args: string[]) => {
        const loggedInUser = readConfig();
        const loggedInUsername = loggedInUser.currentUserName;
        let loggedInUserId;
        let userObj;

        if (typeof(loggedInUsername) === "string") {
            userObj = await getUserByName(loggedInUsername);
            if (!userObj){
                throw new Error (`User ${loggedInUsername} does not exist`);
            }
            loggedInUserId = userObj.id
            await handler(cmdName, userObj, ...args);
        } else {
            throw new Error (`User is not logged in.`);
        }
    }
}