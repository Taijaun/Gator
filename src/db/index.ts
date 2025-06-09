import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";

import * as schema from "./schema";
import { readConfig } from "../config";

const config = readConfig();
const conn = postgres(config.dbUrl);
export const db = drizzle(conn, { schema });
