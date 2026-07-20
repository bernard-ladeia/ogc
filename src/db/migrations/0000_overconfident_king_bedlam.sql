CREATE TYPE "public"."team" AS ENUM('n2', 'checkout', 'b2b', 'platform', 'other');--> statement-breakpoint
CREATE TYPE "public"."ticket_priority" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."ticket_status" AS ENUM('open', 'in_progress', 'pending_client', 'resolved', 'closed');--> statement-breakpoint
CREATE TABLE "data_imports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source" text NOT NULL,
	"total_rows" integer DEFAULT 0 NOT NULL,
	"imported_rows" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"error_message" text,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"finished_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "metrics_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"snapshot_date" timestamp NOT NULL,
	"team" "team" NOT NULL,
	"total_tickets" integer DEFAULT 0 NOT NULL,
	"open_tickets" integer DEFAULT 0 NOT NULL,
	"resolved_tickets" integer DEFAULT 0 NOT NULL,
	"avg_resolution_hours" numeric(10, 2),
	"sla_compliance_rate" numeric(5, 2),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"team" "team" DEFAULT 'n2' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "team_members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"external_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" "ticket_status" DEFAULT 'open' NOT NULL,
	"priority" "ticket_priority" DEFAULT 'medium' NOT NULL,
	"team" "team" DEFAULT 'n2' NOT NULL,
	"assignee_id" uuid,
	"category" text,
	"is_major_incident" boolean DEFAULT false NOT NULL,
	"parent_id" uuid,
	"sla_deadline" timestamp,
	"created_at" timestamp NOT NULL,
	"resolved_at" timestamp,
	"closed_at" timestamp,
	"imported_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tickets_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_assignee_id_team_members_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "public"."team_members"("id") ON DELETE no action ON UPDATE no action;