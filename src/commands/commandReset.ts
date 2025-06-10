import { db } from "src/db";
import { sql } from "drizzle-orm";

export async function handlerReset(cmdName: string, ...args: string[]) {
    if (args.length > 0){
        console.log("Reset does not require any arguments.");
        process.exit(1);
    }
    await db.execute(sql`TRUNCATE TABLE feeds, users CASCADE`);
    
    console.log("Db cleared");
    process.exit(0);
}