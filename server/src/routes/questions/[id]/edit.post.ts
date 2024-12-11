import QuestionValidation from '../../../validation/questions';
import { eq } from 'drizzle-orm';
import { questions } from '~/schema/table';

export default defineEventHandler(async (event) => {
    const data = await readValidatedBody(event, QuestionValidation.parse);
    const id = getRouterParam(event, 'id');

    const result = await db.update(questions)
        .set(data)
        .where(eq(questions.id, id));

    if (!result) {
        throw createError({ message: 'Question not found', statusCode: 404 });
    }

    return createApiResponse(200, { message: 'Question updated successfully' });
});
