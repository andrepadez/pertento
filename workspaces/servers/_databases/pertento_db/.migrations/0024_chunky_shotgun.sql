DO $$ BEGIN
 CREATE TYPE "public"."frequency" AS ENUM('monthly', 'yearly');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."subscription_name" AS ENUM('Pertento Subscription Starter', 'Pertento Subscription Pro');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"company_id" bigint,
	"customer_id" varchar(32),
	"subscription_id" varchar(256),
	"subscription_name" "subscription_name",
	"frequency" "frequency",
	"current_period_start" bigint,
	"current_period_end" bigint,
	"canceled_at" bigint
);
