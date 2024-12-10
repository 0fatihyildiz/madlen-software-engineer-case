import { metadata, modelAnswer, questions, supportingEvidence } from '~/schema/table';

// Dummy data
import q1Data from '../../public/q1.json';
import q2Data from '../../public/q2.json';
import q3Data from '../../public/q3.json';
import q4Data from '../../public/q4.json';
import q5Data from '../../public/q5.json';
import q6Data from '../../public/q6.json';

export async function seedDatabase() {
    try {
        const metadataRecord = await db.insert(metadata).values({
            totalQuestions: q1Data.metadata.total_questions,
            coveragePages: q1Data.metadata.coverage_pages,
        }).returning({ id: metadata.id });

        console.log(metadataRecord)

        const modelAnswerRecords: any[] = [];

        const allQuestionData = [
            ...q1Data.questions,
            ...q2Data.questions,
            ...q3Data.questions,
            ...q4Data.questions,
            ...q5Data.questions,
            ...q6Data.questions,
        ];

        for (const question of allQuestionData) {
            const index: number = allQuestionData.indexOf(question);
            const modelAnswerData = question.model_answer;
            const modelAnswerRecord = await db.insert(modelAnswer).values({
                id: index,
                mainArgument: modelAnswerData.main_argument,
                supportingEvidence: modelAnswerData.supporting_evidence,
                conclusion: modelAnswerData.conclusion,
            }).returning({ id: modelAnswer.id });

            modelAnswerRecords.push(modelAnswerRecord);

            for (const evidence of modelAnswerData.supporting_evidence) {
                const index = modelAnswerData.supporting_evidence.indexOf(evidence);
                await db.insert(supportingEvidence).values({
                    id: index,
                    point: evidence.point,
                    pageReference: evidence.page_reference,
                });
            }
        }

        for (const question of allQuestionData) {
            const modelAnswerId = modelAnswerRecords.find(record => record.mainArgument === question.model_answer.main_argument).id;

            await db.insert(questions).values({
                id: question.id,
                questionText: question.question_text,
                contextPages: question.context_pages,
                difficultyLevel: question.difficulty_level,
                cognitiveLevel: question.cognitive_level,
                keyConcepts: question.key_concepts,
                courseName: question.course_name,
                gradingCriteria: question.grading_criteria,
                modelAnswerId,
                metadataId: metadataRecord[0].id,
            });
        }

        console.log('Database seeding completed!');
    } catch (error) {
        console.error('Error during seeding:', error);
    }
}