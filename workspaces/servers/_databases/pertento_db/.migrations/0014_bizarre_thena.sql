CREATE TABLE IF NOT EXISTS "cookie_targeting" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"device" text,
	"experiment_id" bigint
);
