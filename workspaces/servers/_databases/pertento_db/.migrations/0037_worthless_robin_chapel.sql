CREATE TABLE IF NOT EXISTS "invoices" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"company_id" bigint,
	"customer_id" varchar(32),
	"invoice_id" varchar(256),
	"subscription_id" varchar(256),
	"amount" bigint,
	"paid" bigint,
	"invoice_pdf" varchar(1024),
	"created_at" bigint
);
