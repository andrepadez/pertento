ALTER TABLE "cookie_targeting" RENAME COLUMN "cookie_value" TO "cookie_values";--> statement-breakpoint
ALTER TABLE "cookie_targeting" ALTER COLUMN "cookie_values" SET DATA TYPE json;