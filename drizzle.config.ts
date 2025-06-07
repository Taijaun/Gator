import { defineConfig } from "drizzle-kit";
import { readConfig } from "src/config";


const configUrl = readConfig()

export default defineConfig({
  schema: "src/db/schema.ts",
  out: "src/gen",
  dialect: "postgresql",
  dbCredentials: {
    url: configUrl.dbUrl,
  },
});