CREATE TABLE "metadata" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v1mc() NOT NULL,
	"total_questions" integer NOT NULL,
	"coverage_pages" integer[] NOT NULL,
	"primary_topics" text[] DEFAULT '{}'::text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "model_answer" (
	"id" integer PRIMARY KEY NOT NULL,
	"main_argument" text NOT NULL,
	"key_points" text[] DEFAULT '{}'::text[] NOT NULL,
	"supporting_evidence" jsonb NOT NULL,
	"conclusion" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"question_text" text NOT NULL,
	"context_pages" integer[] NOT NULL,
	"difficulty_level" varchar(50) NOT NULL,
	"cognitive_level" varchar(50) NOT NULL,
	"key_concepts" text[] NOT NULL,
	"course_name" text NOT NULL,
	"model_answer_id" integer NOT NULL,
	"grading_criteria" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "supporting_evidence" (
	"id" integer PRIMARY KEY NOT NULL,
	"point" text NOT NULL,
	"page_reference" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_model_answer_id_model_answer_id_fk" FOREIGN KEY ("model_answer_id") REFERENCES "public"."model_answer"("id") ON DELETE no action ON UPDATE no action;