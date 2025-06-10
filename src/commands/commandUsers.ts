import { getUsers } from "src/db/queries/users";
import { readConfig } from "src/config";

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