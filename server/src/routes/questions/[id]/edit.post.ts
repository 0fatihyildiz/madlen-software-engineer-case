import QuestionValidation from '../../../validation/questions';
import { eq } from 'drizzle-orm';
import { questions } from '~/schema/table';

export default defineCachedEventHandler(async (event) => {
    setResponseHeaders(event, {
        accessControlAllowOrigin: "*",
        "content-type": "application/json",
    });

    const body = await readBody(event);
    const id = getRouterParam(event, 'id');

    console.log(body);

    const result = await db.update(questions)
        .set(body)
        .where(eq(questions.id, id));

    if (!result) {
        throw createError({ message: 'Question not found', statusCode: 404 });
    }

    return createApiResponse(200, { message: 'Question updated successfully' });
});
