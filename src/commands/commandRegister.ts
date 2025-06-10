import { getUserByName, createUser } from "src/db/queries/users";
import { setUser } from "src/config";

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