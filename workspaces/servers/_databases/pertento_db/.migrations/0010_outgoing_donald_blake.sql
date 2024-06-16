CREATE TABLE IF NOT EXISTS "passkeys" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"credential_id" text,
	"public_key" text
);
