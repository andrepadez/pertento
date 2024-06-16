ALTER TABLE "websites" ADD COLUMN "parent_company_id" bigint;--> statement-breakpoint
ALTER TABLE "experiments" ADD COLUMN "company_id" bigint;--> statement-breakpoint
ALTER TABLE "experiments" ADD COLUMN "parent_company_id" bigint;