import { metadata } from "~/schema";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const { difficulty_level, cognitive_level, course_name, context_pages, question_text, page } = query;

    const metadataResponse = await db.select().from(metadata);

    if (page && !difficulty_level && !cognitive_level && !course_name && !context_pages && !question_text) {
        const paginateMeta = metadataResponse[Number(page) - 1]

        const questions = await db.query.questions.findMany({
            where: (questions, { eq }) => eq(questions.metadataId, paginateMeta.id)
        })

        if (!questions.length) {
            throw createError({ message: 'No questions found', statusCode: 404 });
        }

        return createApiResponse(200, {
            questions,
            metadata: paginateMeta
        });
    }

    let dbQuery = db.query.questions.findMany({
        where: (questions, { eq, like }) => {
            let conditions = [];
            if (difficulty_level) {
                conditions.push(eq(questions.difficultyLevel, String(difficulty_level)));
            }
            if (cognitive_level) {
                conditions.push(eq(questions.cognitiveLevel, String(cognitive_level)));
            }
            if (course_name) {
                conditions.push(eq(questions.courseName, String(course_name)));
            }
            if (context_pages) {
                const contextPagesArray = Array.isArray(context_pages) ? context_pages : [context_pages];

                if (contextPagesArray && contextPagesArray.length > 0) {
                    conditions.push(eq(questions.contextPages, contextPagesArray.map(Number)));
                }
            }
            if (question_text) {
                conditions.push(like(questions.questionText, `%${question_text}%`));
            }

            return conditions.length ? conditions.reduce((acc, condition) => ({ ...acc, ...condition }), {}) : {};
        }
    });

    const questions = await dbQuery;

    if (!questions.length) {
        throw createError({ message: 'No questions found', statusCode: 404 });
    }

    return createApiResponse(200, {
        questions,
        metadata: null
    });
});
