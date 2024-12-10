import { metadata } from "~/schema";

export default defineEventHandler(async () => {
    const result = await db.select().from(metadata);

    if (!result)
        createError({ message: 'No metadata found', statusCode: 404 });

    return createApiResponse(200, result)
})