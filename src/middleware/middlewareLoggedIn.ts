import { CommandHandler } from "src/commands/commandHandler";
import { User } from "src/db/schema";

type UserCommandHandler = (
    cmdName: string,
    user: User,
    ...args: string[]
) => Promise<void>;

type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;