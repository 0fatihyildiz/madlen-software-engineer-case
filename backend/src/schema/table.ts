import { sql } from "drizzle-orm";
import { pgTable, integer, text, jsonb, varchar, uuid } from "drizzle-orm/pg-core";

export const defaultId = sql`uuid_generate_v1()`

export const metadata = pgTable("metadata", {
    id: uuid('id').default(defaultId).primaryKey(),
    totalQuestions: integer("total_questions").notNull(),
    coveragePages: integer("coverage_pages").array().notNull(),
    primaryTopics: text("primary_topics").array().notNull().default(sql`'{}'::text[]`),
});

export const supportingEvidence = pgTable("supporting_evidence", {
    id: integer("id").primaryKey(),
    point: text("point").notNull(),
    pageReference: integer("page_reference").notNull(),
});

export const modelAnswer = pgTable("model_answer", {
    id: integer("id").primaryKey(),
    mainArgument: text("main_argument").notNull(),
    keyPoints: text("key_points").array().notNull().default(sql`'{}'::text[]`),
    supportingEvidence: jsonb("supporting_evidence").notNull(),
    conclusion: text("conclusion").notNull(),
});

export const questions = pgTable("questions", {
    id: varchar("id", { length: 255 }).primaryKey(),
    questionText: text("question_text").notNull(),
    contextPages: integer("context_pages").array().notNull(),
    difficultyLevel: varchar("difficulty_level", { length: 50 }).notNull(),
    cognitiveLevel: varchar("cognitive_level", { length: 50 }).notNull(),
    keyConcepts: text("key_concepts").array().notNull(),
    courseName: text("course_name").notNull(),
    modelAnswerId: integer("model_answer_id")
        .notNull()
        .references(() => modelAnswer.id),
    gradingCriteria: text("grading_criteria").array().notNull(),
    metadataId: uuid("metadata_id")
        .notNull()
        .references(() => metadata.id),
});
