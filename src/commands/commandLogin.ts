import { getUserByName } from "src/db/queries/users";
import { setUser } from "src/config";

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