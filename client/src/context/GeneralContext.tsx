import type { ReactNode } from 'react'
import type { MetaData, Question } from '../types/question'
import { createContext, useState } from 'react'
import fetcher from '../utils/api'

interface GeneralContextType {
    page: number
    setPage: (page: number) => void
    questions: {
        questions: Question[]
        metadata: MetaData | null
    } | null
    setQuestions?: (questions: any) => void
    filters?: Record<string, string | string[]>
    setFilters?: React.Dispatch<React.SetStateAction<typeof initialFilters>>

    fetchMetaData: () => Promise<any>
    fetchQuestions: (page?: number) => Promise<any>
    fetchQuestionsWithFilter?: (filters: Record<string, string | string[]>) => Promise<any>

    handleFilterChange?: (pageVal?: number) => void
}

export const initialFilters = {
    course_name: '',
    difficulty_level: '',
    cognitive_level: '',
    question_text: '',
    context_name: [] as string[],
}

export const GeneralContext = createContext<GeneralContextType>({
    page: 1,
    setPage: () => null,
    questions: null,
    setQuestions: () => null,
    filters: initialFilters,
    setFilters: () => null,

    fetchQuestionsWithFilter: () => Promise.resolve(null),
    fetchMetaData: () => Promise.resolve(null),
    fetchQuestions: () => Promise.resolve(null),

    handleFilterChange: () => null,
})

interface GeneralProviderProps {
    children: ReactNode
}

function GeneralProvider({ children }: GeneralProviderProps) {
    const [page, setPage] = useState(1)
    const [questions, setQuestions] = useState({
        questions: [],
        metadata: null,
    })
    const [filters, setFilters] = useState(initialFilters)

    async function fetchMetaData() {
        return fetcher(`/metadata`)
    }

    const fetchQuestionsWithFilter = async (filters: Record<string, string | string[]>) => {
        const query = new URLSearchParams({
            ...filters,
            context_name: (filters.context_name as string[]).join(','),
        }).toString()
        const response = await fetcher(`/questions?${query}`, { method: 'GET' })
        setQuestions(response)
        return response
    }

    async function fetchQuestions(pageVal?: number) {
        const query = new URLSearchParams({
            page: pageVal?.toString() || page.toString(),
        }).toString()

        const response = await fetcher(`/questions?${query}`)
        setQuestions(response)
        return response
    }

    async function handleFilterChange(pageVal?: number) {
        if (pageVal)
            setPage(pageVal)

        if (filters) {
            fetchQuestionsWithFilter?.(filters)
        }

        if (!filters || !Object.values(filters).some(val => Array.isArray(val) ? val.length > 0 : val.trim() !== '')) {
            fetchQuestions(pageVal)
        }
    }
    return (
        <GeneralContext.Provider value={{ page, setPage, fetchMetaData, fetchQuestions, questions, setQuestions, filters, setFilters, fetchQuestionsWithFilter, handleFilterChange }}>
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralProvider
