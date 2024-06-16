CREATE TABLE IF NOT EXISTS "experiment_data" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"timestamp" bigint,
	"website_id" bigint,
	"experiment_id" bigint,
	"variant_id" bigint,
	"event" varchar(255),
	"data" json
);
