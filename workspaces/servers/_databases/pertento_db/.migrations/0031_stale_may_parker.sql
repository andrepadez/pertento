ALTER TABLE "subscriptions" ALTER COLUMN "product_id" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "interval" varchar(16);