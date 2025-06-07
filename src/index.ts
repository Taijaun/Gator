import { readConfig, setUser } from "./config";
import { CommandsRegistry, handlerLogin, registerCommand, runCommand} from "./commands/commandHandler.js"


function main() {
    const registry: CommandsRegistry = {}
    registerCommand(registry, "login", handlerLogin);
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.log("You're missing arguments");
        process.exit(1);
    }

    const cmdName = args[0];
    const argsArray = args.slice(1);

    try {
        runCommand(registry, cmdName, ...argsArray);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            process.exit(1);
        } else {
            console.log("Error: ", error);
            process.exit(1);
        }
    }
    
}

main();