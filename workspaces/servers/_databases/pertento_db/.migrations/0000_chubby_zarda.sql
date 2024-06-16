DO $$ BEGIN
 CREATE TYPE "user_status" AS ENUM('Unverified', 'Active', 'Prospect', 'Invited', 'Blocked');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_roles" AS ENUM('Member', 'Admin', 'Owner', 'Super Admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "company_type" AS ENUM('Client Account', 'Agency');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "company_size" AS ENUM('1-10', '11-30', '31-50', '50+');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('Draft', 'Scheduled', 'Running', 'Stopped', 'Ended');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "condition" AS ENUM('equals', 'starts with', 'contains', 'ends with', 'matches regex', 'not equals', 'does not contain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "device" AS ENUM('All', 'Desktop', 'Mobile', 'Tablet');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"role" "user_roles" DEFAULT 'Member',
	"status" "user_status" DEFAULT 'Unverified',
	"password" varchar(256),
	"first_name" varchar(128),
	"last_name" varchar(128),
	"avatar" varchar(128000),
	"company_id" bigint,
	"invited_by" bigint,
	"created_at" bigint,
	"updated_at" bigint,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"friendly_name" text,
	"type" "company_type" DEFAULT 'Client Account',
	"size" "company_size" DEFAULT '1-10',
	"parent_company_id" bigint,
	"gan_account_id" bigint,
	"created_by" bigint,
	"created_at" bigint,
	"updated_at" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gan_oauth" (
	"email" varchar(256) PRIMARY KEY NOT NULL,
	"company_id" bigint,
	"name" varchar(36),
	"image" varchar(256),
	"refresh_token" varchar(256),
	"accounts_count" smallint,
	"last_refreshed" bigint,
	"refresh_count" smallint DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gan_properties" (
	"property_id" bigint PRIMARY KEY NOT NULL,
	"display_name" varchar(256),
	"property_type" varchar(128),
	"account_id" bigint,
	"has_edit_permission" json DEFAULT '[]'::json,
	"has_read_permission" json DEFAULT '[]'::json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gan_event_tags" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"gan_property_id" bigint,
	"name" varchar(256),
	"is_conversion" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "websites" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"company_id" bigint,
	"url" varchar(256) NOT NULL,
	"gan_property_id" bigint,
	"gan_measurement_id" varchar(32),
	"server_container_url" varchar(256),
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experiments" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"created_by" bigint,
	"website_id" bigint,
	"editor_url" varchar(512),
	"starts_at" bigint,
	"ends_at" bigint,
	"status" "status" DEFAULT 'Draft',
	"event_goals" json DEFAULT '[]'::json,
	"created_at" bigint,
	"updated_at" bigint,
	"final_visitor_count" json,
	"deleted" bigint,
	"archived" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variants" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"experiment_id" bigint,
	"gan_audience_id" bigint,
	"created_by" bigint,
	"weight" smallint,
	"global_javascript" text,
	"global_css" text,
	"created_at" bigint,
	"updated_at" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visitor-count" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"experiment_id" bigint,
	"variant_id" bigint,
	"count" bigint DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activity_log" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"experiment_id" bigint,
	"user_id" bigint,
	"created_at" bigint,
	"message" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tracking" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"experiment_id" bigint,
	"created_by" bigint,
	"created_at" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "url_targeting" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"condition" "condition",
	"experiment_id" bigint,
	"created_by" bigint,
	"created_at" bigint,
	"updated_at" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "device_targeting" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"device" "device",
	"experiment_id" bigint,
	"created_by" bigint,
	"created_at" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "changes" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"variant_id" bigint,
	"user_id" bigint,
	"element_id" text,
	"selector" text,
	"friendly_selector" text,
	"friendly_selector_index" smallint,
	"selectors" json,
	"friendly_selectors" json,
	"friendly_selectors_indexes" json,
	"property" text,
	"value" text,
	"prev_value" text,
	"tagName" text,
	"className" text,
	"action" text,
	"sibling_element" text,
	"sibling_element_selector" text,
	"sibling_element_className" text,
	"sibling_element_tagName" text,
	"original_sibling_element" text,
	"original_sibling_element_selector" text,
	"original_sibling_element_className" text,
	"original_sibling_element_tagName" text,
	"new_selector" text,
	"original_parent" text,
	"original_parent_selector" text,
	"new_sibling_element" text,
	"top" text,
	"left" text,
	"created_at" bigint,
	"updated_at" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "script_injector_monitoring" (
	"start_time" bigint PRIMARY KEY NOT NULL,
	"websites" json,
	"updated_at" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "purchases" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"website_id" bigint,
	"experiment_id" bigint,
	"variant_id" bigint,
	"from" bigint,
	"currency_code" varchar(4),
	"purchases" integer,
	"revenue" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experiment_data" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"timestamp" bigint,
	"website_id" bigint,
	"experiment_id" bigint,
	"variant_id" bigint,
	"event" varchar(255),
	"data" json
);
