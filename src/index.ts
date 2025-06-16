
import { CommandsRegistry, registerCommand, runCommand} from "./commands/commandHandler.js"
import { handlerAddFeed } from "./commands/commandAddFeed";
import { handlerAgg } from "./commands/commandAgg.js";
import { handlerUsers } from "./commands/commandUsers.js";
import { handlerReset } from "./commands/commandReset.js";
import { handlerRegister } from "./commands/commandRegister.js";
import { handlerLogin } from "./commands/commandLogin.js";
import { handlerFeeds } from "./commands/commandFeeds.js";
import { handlerFollow } from "./commands/commandFollow.js";
import { handlerFollowing } from "./commands/commandFollowing.js";
import { middlewareLoggedIn } from "./middleware/middlewareLoggedIn.js";


async function main() {
    const registry: CommandsRegistry = {}
    registerCommand(registry, "login", handlerLogin);
    registerCommand(registry, "register", handlerRegister);
    registerCommand(registry, "reset", handlerReset);
    registerCommand(registry, "users", handlerUsers);
    registerCommand(registry, "agg", handlerAgg);
    registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
    registerCommand(registry, "feeds", handlerFeeds);
    registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
    registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));

    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.log("You're missing arguments");
        process.exit(1);
    }

    const cmdName = args[0];
    const argsArray = args.slice(1);

    try {
        await runCommand(registry, cmdName, ...argsArray);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            process.exit(1);
        } else {
            console.log("Error: ", error);
            process.exit(1);
        }
    }

    process.exit(0);
    
}

main();