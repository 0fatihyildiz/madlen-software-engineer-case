import { z } from 'zod';

export default z.object({
    questionText: z.string().min(1).optional(),
    contextPages: z.array(z.number()).min(1).optional(),
    difficultyLevel: z.string().max(50).optional(),
    cognitiveLevel: z.string().max(50).optional(),
    keyConcepts: z.array(z.string()).min(1).optional(),
    courseName: z.string().min(1).optional(),
    gradingCriteria: z.array(z.string()).min(1).optional(),
});