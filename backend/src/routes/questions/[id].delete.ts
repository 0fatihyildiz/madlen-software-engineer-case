import { eq } from "drizzle-orm";
import { questions } from "~/schema";
import { createApiResponse } from "~/utils/helper";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const result = await db.delete(questions).where(eq(questions.id, id));

    if (!result)
        createError({ message: 'No questions found', statusCode: 404 });

    return createApiResponse(200, result)
})