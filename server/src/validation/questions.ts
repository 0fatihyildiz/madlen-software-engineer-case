import { z } from 'zod';

export default z.preprocess((val) => {
    if (typeof val === 'string') {
        try {
            return JSON.parse(val);
        } catch (e) {
            return val;
        }
    }
    return val;
}, z.object({
    questionText: z.string().nonempty("Soru metni boş olamaz"),
    difficultyLevel: z.string().nonempty("Zorluk seviyesi boş olamaz"),
    cognitiveLevel: z.string().nonempty("Bilişsel seviye boş olamaz"),
    courseName: z.string().nonempty("Kurs adı boş olamaz"),
}));