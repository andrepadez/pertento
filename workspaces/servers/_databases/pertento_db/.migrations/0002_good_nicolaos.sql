ALTER TABLE "changes" RENAME COLUMN "tagName" TO "tag_name";--> statement-breakpoint
ALTER TABLE "changes" ADD COLUMN "tag_names" json;--> statement-breakpoint
ALTER TABLE "changes" ADD COLUMN "prev_values" json;--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "element_id";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "className";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "sibling_element";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "sibling_element_selector";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "sibling_element_className";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "sibling_element_tagName";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "original_sibling_element";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "original_sibling_element_selector";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "original_sibling_element_className";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "original_sibling_element_tagName";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "new_selector";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "original_parent";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "original_parent_selector";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "new_sibling_element";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "top";--> statement-breakpoint
ALTER TABLE "changes" DROP COLUMN IF EXISTS "left";