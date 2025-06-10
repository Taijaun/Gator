import { readConfig, setUser } from "./config";
import { CommandsRegistry, handlerAddFeed, handlerAgg, handlerLogin, handlerRegister, handlerReset, handlerUsers, registerCommand, runCommand} from "./commands/commandHandler.js"



async function main() {
    const registry: CommandsRegistry = {}
    registerCommand(registry, "login", handlerLogin);
    registerCommand(registry, "register", handlerRegister);
    registerCommand(registry, "reset", handlerReset);
    registerCommand(registry, "users", handlerUsers);
    registerCommand(registry, "agg", handlerAgg);
    registerCommand(registry, "addfeed", handlerAddFeed);
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