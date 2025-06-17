Here’s a README.md template tailored for your Gator RSS Feed Aggregator CLI project. Feel free to tweak names, paths, or examples as needed:

⸻


# Gator 🦅

Gator is a **command-line RSS feed aggregator** built with Node.js/TypeScript and PostgreSQL.  
It allows multiple users to register, add feeds, follow/unfollow feeds, and view aggregated posts straight in the terminal.

---

## 🚀 Prerequisites

- Node.js (v16+)
- PostgreSQL database

---

## 🛠️ Setup

1. **Clone the repo & install dependencies**

   ```bash
   git clone https://github.com/Taijaun/Gator.git
   cd Gator
   npm install

2. **Configure your database**
    Create a PostgreSQL database and note its connection URL (e.g. 		 
    postgres://user:pass@localhost:5432/gatordb).

3. **Create a config file**
    In the project root, create drizzle.config.ts (or .js) to point Drizzle at your DB:

   import { defineConfig } from "drizzle-kit";

    export default defineConfig({
    schema: "src/db/schema.ts",
    out: "src/gen",
    dialect: "postgresql",
    dbCredentials: {
    url: "postgres://user:pass@localhost:5432/gatordb",
  },
});

4. **Run migrations (with Drizzle Kit)**

    npx drizzle-kit generate --config ./drizzle.config.ts
    npx drizzle-kit push --config ./drizzle.config.ts



⸻

⚙️ Running the CLI

Use npm run start (or install globally) and run:

node ./dist/index.js <command> [args]

Or (if TS support is configured):

npx tsx ./src/index.ts <command> [args]


⸻

📚 Available Commands<br>
	•	register <username> <br>
Create a new user and log in as them.<br>
	•	login <username><br>
Log in as an existing user.<br>
	•	addfeed <name> <url><br>
Add a new RSS feed to the system.<br>
	•	feeds<br>
List all available feeds along with creator info.<br>
	•	follow <url> / unfollow <url><br>
Follow or unfollow a feed as the current user.<br>
	•	following<br>
List all feeds the current user follows.<br>
	•	agg <interval><br>
Fetch and aggregate new posts from followed feeds periodically (e.g., agg 10s, agg 5m).<br>
	•	browse [limit]<br>
View the latest aggregated posts (default limit is 10).<br>
	•	users<br>
List all registered users.<br>
	•	reset<br>
Delete all database data (nothing critical—local dev only).<br>

⸻

🧩 Usage Example

# Initialize
npm run start register alice

# Add a feed
npm run start addfeed "Example Feed" "https://example.com/rss"

# Start aggregation every minute
npm run start agg 1m

# Browse new posts
npm run start browse 5


⸻

👍 Tips
	•	Store your database URL securely in environment variables.
	•	Use shorter intervals like 10s during development.
	•	agg and browse can run simultaneously in separate terminal windows.

⸻

🧪 Development & Build
	•	Dev mode (auto-reload): npm run dev
	•	Build for production: npm run build
	•	Run tests (if any): npm test

⸻

💡 Contributing

Feel free to submit issues or PRs for:
	•	Supporting Atom feeds
	•	Improving CLI UX (e.g., coloring or paging)
	•	Adding export formats (JSON, Markdown, HTML)
	•	Better error handling or feed parsing

⸻

📝 License

MIT License © 2025 Taijaun

⸻

Enjoy aggregating! 🦅
