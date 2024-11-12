DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('Multi Variant', 'Server Side', 'URL Redirect');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "experiments" ADD COLUMN "type" "type" DEFAULT 'Multi Variant';