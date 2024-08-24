CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"company_id" bigint,
	"customer_id" varchar(32),
	"email" varchar(256),
	"subscription_id" varchar(256),
	"product_id" varchar(16),
	"current_period_start" bigint,
	"current_period_end" bigint,
	"canceled_at" bigint
);
