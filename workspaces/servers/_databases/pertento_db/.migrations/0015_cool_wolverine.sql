ALTER TABLE "cookie_targeting" RENAME COLUMN "device" TO "cookie_name";--> statement-breakpoint
ALTER TABLE "cookie_targeting" ADD COLUMN "cookie_value" text;