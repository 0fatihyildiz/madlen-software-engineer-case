import { createApiResponse } from "~/utils/helper";

export default defineCachedEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const result = await db.query.questions.findFirst({
        where: (questions, { eq }) => eq(questions.id, id)
    });

    if (!result)
        createError({ message: 'No questions found', statusCode: 404 });

    return createApiResponse(200, result)
})