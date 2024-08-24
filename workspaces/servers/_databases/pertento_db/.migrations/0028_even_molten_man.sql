DO $$ BEGIN
 CREATE TYPE "public"."frequency" AS ENUM('monthly', 'yearly');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."subscription_name" AS ENUM('Agency Pro', 'Agency Standard', 'Agency Starter', 'Pertento Pro', 'Pertento Standard', 'Pertento Starter');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"company_id" bigint,
	"customer_id" varchar(32),
	"email" varchar(256),
	"subscription_id" varchar(256),
	"product_id" varchar(256),
	"frequency" "frequency",
	"current_period_start" bigint,
	"current_period_end" bigint,
	"canceled_at" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"company_id" bigint,
	"customer_id" varchar(32),
	"invoice_id" varchar(256),
	"subscription_id" varchar(256),
	"amount" bigint,
	"paid" boolean,
	"invoice_pdf" varchar(1024),
	"created_at" bigint
);
