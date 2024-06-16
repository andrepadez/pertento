CREATE TABLE IF NOT EXISTS "statistics" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"website_id" bigint,
	"experiment_id" bigint,
	"variant_id" bigint,
	"from" bigint,
	"currency_code" varchar(4),
	"count" integer,
	"value" bigint
);
