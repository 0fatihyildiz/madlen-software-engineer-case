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

export type { Question, QuestionUpdate }
