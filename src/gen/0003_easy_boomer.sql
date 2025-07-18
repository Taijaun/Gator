ALTER TABLE "feed_follows" RENAME COLUMN "Feed_id" TO "feed_id";--> statement-breakpoint
ALTER TABLE "feed_follows" DROP CONSTRAINT "feed_follows_user_id_unique";--> statement-breakpoint
ALTER TABLE "feed_follows" DROP CONSTRAINT "feed_follows_Feed_id_unique";--> statement-breakpoint
ALTER TABLE "feed_follows" DROP CONSTRAINT "feed_follows_Feed_id_feeds_id_fk";
--> statement-breakpoint
ALTER TABLE "feed_follows" ADD CONSTRAINT "feed_follows_feed_id_feeds_id_fk" FOREIGN KEY ("feed_id") REFERENCES "public"."feeds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feed_follows" ADD CONSTRAINT "unique_combo" UNIQUE("user_id","feed_id");