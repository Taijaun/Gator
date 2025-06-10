CREATE TABLE "feed_follows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"Feed_id" uuid NOT NULL,
	CONSTRAINT "feed_follows_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "feed_follows_Feed_id_unique" UNIQUE("Feed_id")
);
--> statement-breakpoint
ALTER TABLE "feed_follows" ADD CONSTRAINT "feed_follows_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feed_follows" ADD CONSTRAINT "feed_follows_Feed_id_feeds_id_fk" FOREIGN KEY ("Feed_id") REFERENCES "public"."feeds"("id") ON DELETE cascade ON UPDATE no action;