interface Question {
    id: string
    questionText: string
    contextPages: number[]
    difficultyLevel: string
    cognitiveLevel: string
    keyConcepts: string[]
    courseName: string
    modelAnswerId: number
    gradingCriteria: string[]
    metadataId: string
}

interface QuestionUpdate {
    questionText?: string
    contextPages?: number[]
    difficultyLevel?: string
    cognitiveLevel?: string
    keyConcepts?: string[]
    courseName?: string
    gradingCriteria?: string[]
}

interface MetaData {
    id: string
    totalQuestions: number
    coveragePages: number[]
    primaryTopics: string[]
}

export type { MetaData, Question, QuestionUpdate }
