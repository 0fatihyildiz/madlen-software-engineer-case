import type { ReactNode } from 'react'
import type { MetaData, Question } from '../types/question'
import { createContext, useState } from 'react'
import fetcher from '../utils/api'

interface GeneralContextType {
    page: number
    setPage: (page: number) => void
    fetchMetaData: () => Promise<any>
    fetchQuestions: (page?: number) => Promise<any>
    questions: {
        questions: Question[]
        metadata: MetaData | null
    } | null
    setQuestions?: (questions: any) => void
}

export const GeneralContext = createContext<GeneralContextType>({
    page: 1,
    setPage: () => null,
    fetchMetaData: () => Promise.resolve(null),
    fetchQuestions: () => Promise.resolve(null),
    questions: null,
    setQuestions: () => null,
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

    async function fetchMetaData() {
        return fetcher(`/metadata`)
    }

    async function fetchQuestions(pageVal?: number) {
        const query = new URLSearchParams({
            page: pageVal?.toString() || page.toString(),
        }).toString()

        const response = await fetcher(`/questions?${query}`)
        setQuestions(response)
        return response
    }

    return (
        <GeneralContext.Provider value={{ page, setPage, fetchMetaData, fetchQuestions, questions, setQuestions }}>
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralProvider
