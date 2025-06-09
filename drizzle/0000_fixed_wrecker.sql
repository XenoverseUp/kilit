CREATE TYPE "public"."answer_type" AS ENUM('string', 'number', 'boolean');--> statement-breakpoint
CREATE TYPE "public"."field_type" AS ENUM('email', 'name', 'surname', 'age', 'custom');--> statement-breakpoint
CREATE TABLE "form_fields" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link_id" uuid NOT NULL,
	"field_type" "field_type",
	"question" text,
	"answer_type" "answer_type",
	"required" boolean DEFAULT false,
	"display_order" integer
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"group_id" uuid,
	"locked_url" text NOT NULL,
	"redirect_url" text NOT NULL,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link_id" uuid NOT NULL,
	"submitted_at" timestamp DEFAULT now(),
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"picture" text,
	"created_at" timestamp DEFAULT now(),
	"preferences" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
ALTER TABLE "form_fields" ADD CONSTRAINT "form_fields_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE cascade ON UPDATE no action;