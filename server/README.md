# Backend Specifications - Madlen Case

This backend service handles the management of metadata, questions, model answers, and supporting evidence using PostgreSQL as the database. It is built with NitroJS, DrizzleORM, and PostgreSQL driver for seamless handling of database interactions. also zod is used for validation of request body.

## Technologies Used

- **NitroJS**: A minimalistic backend framework that provides server-side logic for the application.
- **DrizzleORM**: A TypeScript-first ORM for interacting with PostgreSQL, enabling type-safe SQL queries and schema definitions.
- **PostgreSQL**: A powerful relational database used for storing the application's data.

## Endpoints
- `GET` **/metadata**: Fetches all metadata entries.
- `GET` **/questions**: Fetches all questions with associated metadata.
- `GET` **/questions/:id**: Fetches a specific question by ID.
- `PUT` **/questions/:id**: Updates an existing question by ID.
- `DELETE` **/questions/:id**: Deletes a question by ID.

## Database Schema

The database schema is composed of the following tables:

1. **metadata**:
   - Stores metadata related to questions and model answers.
   - Fields:
     - `id`: A unique UUID identifier.
     - `totalQuestions`: Total number of questions.
     - `coveragePages`: Array of pages covered by the metadata.
     - `primaryTopics`: Array of primary topics related to the metadata.

2. **supporting_evidence**:
   - Stores points of supporting evidence for each model answer.
   - Fields:
     - `id`: A unique identifier.
     - `point`: A textual representation of a supporting point.
     - `pageReference`: The page reference for the evidence.

3. **model_answer**:
   - Stores the model answers for questions, including the main argument and supporting evidence.
   - Fields:
     - `id`: A unique identifier.
     - `mainArgument`: The main argument of the model answer.
     - `keyPoints`: Array of key points in the model answer.
     - `supportingEvidence`: A JSONB column containing supporting evidence.
     - `conclusion`: The conclusion of the model answer.

4. **questions**:
   - Stores questions with associated metadata, context, and difficulty.
   - Fields:
     - `id`: A unique identifier.
     - `questionText`: The text of the question.
     - `contextPages`: Array of pages that provide context for the question.
     - `difficultyLevel`: The difficulty level of the question.
     - `cognitiveLevel`: The cognitive level required to answer the question.
     - `keyConcepts`: Array of key concepts related to the question.
     - `courseName`: The name of the course to which the question belongs.
     - `modelAnswerId`: References the `id` from the `model_answer` table.
     - `gradingCriteria`: Array of grading criteria for the question.
     - `metadataId`: References the `id` from the `metadata` table.
