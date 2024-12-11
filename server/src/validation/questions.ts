import { z } from 'zod';

export default z.object({
    questionText: z.string().optional().nullable(),
    contextPages: z.array(z.number()).optional().nullable(),
    difficultyLevel: z.string().max(50).optional().nullable(),
    cognitiveLevel: z.string().max(50).optional().nullable(),
    keyConcepts: z.array(z.string()).optional().nullable(),
    courseName: z.string().optional().nullable(),
    gradingCriteria: z.array(z.string()).optional().nullable(),
});