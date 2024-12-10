import { questions } from "~/schema/table";
import { createApiResponse } from "~/utils/helper";
import { seedDatabase } from "~/utils/seed";

export default defineEventHandler(async (event) => {
    const result = await db.select().from(questions);

    if (!result)
        createError({ message: 'No questions found', statusCode: 404 });

    return createApiResponse(200, result)
})