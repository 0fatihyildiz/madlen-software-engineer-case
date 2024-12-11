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

export type { Question }
