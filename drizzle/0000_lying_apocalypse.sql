CREATE TABLE "branches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"city" varchar(100) NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"phone" varchar(50),
	"map_link" text,
	"map_embed" text,
	"is_active" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "contact_leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"email" varchar(255),
	"message" text,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"is_read" boolean DEFAULT false,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"is_visible" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "gallery_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_url" text NOT NULL,
	"caption" text,
	"category" varchar(100),
	"is_visible" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "gym_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"number" integer NOT NULL,
	"suffix" varchar(10),
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "pricing_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"duration" varchar(100),
	"best_for" varchar(255),
	"price" varchar(100) NOT NULL,
	"features" jsonb DEFAULT '[]' NOT NULL,
	"is_highlighted" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"icon" varchar(50) NOT NULL,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"key" varchar(100) PRIMARY KEY NOT NULL,
	"value" text,
	"label" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "trainers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"specialization" varchar(255),
	"experience" varchar(100),
	"image_url" text,
	"is_visible" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "transformations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"goal" varchar(255),
	"quote" text,
	"image_before" text,
	"image_after" text,
	"is_visible" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0
);
