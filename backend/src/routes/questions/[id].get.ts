import { questions } from "~/schema/table";
import { createApiResponse } from "~/utils/helper";

export default defineEventHandler(async () => {
    const result = await db.select().from(questions);

    if (!result)
        createError({ message: 'No questions found', statusCode: 404 });

    return createApiResponse(200, result)
})