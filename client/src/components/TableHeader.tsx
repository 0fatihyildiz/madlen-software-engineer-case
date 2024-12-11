import type { Question } from '../types/question'
import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Badge, Button, Flex, Select, TextField } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { COGNITIVE_LEVEL, COURSE_NAME, DIFFICULTY_LEVEL } from '../constants/table'
import { GeneralContext } from '../context/GeneralContext'
import fetcher from '../utils/api'

function useDebouncedValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}

function selectOptions(
    key: keyof typeof initialFilters,
    placeholder: string,
    options: string[],
    handleChange: (key: string, val: string) => void,
    value: string,
) {
    return (
        <Select.Root value={value} onValueChange={newValue => handleChange(key, newValue)}>
            <Select.Trigger className="capitalize" placeholder={placeholder} />
            <Select.Content>
                <Select.Group>
                    <Select.Label>{placeholder}</Select.Label>
                    {options.map(option => (
                        <Select.Item key={option} className="capitalize" value={option.at(0)?.toUpperCase() + option.slice(1)}>
                            {option}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

const initialFilters = {
    course_name: '',
    difficulty_level: '',
    cognitive_level: '',
    question_text: '',
    context_name: '',
}

function TableHeader() {
    const { setQuestions, fetchQuestions } = useContext(GeneralContext)

    const [filters, setFilters] = useState(initialFilters)
    const debouncedFilters = useDebouncedValue(filters, 500)
    const isAnyFilterActive = Object.values(debouncedFilters).some(val => val.trim() !== '')

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const handleClearFilters = () => {
        setFilters(initialFilters)
        fetchQuestions()
    }

    const fetchQuestionsWithFilter = async (filters: Record<string, string>) => {
        const query = new URLSearchParams(filters).toString()
        return fetcher(`/questions?${query}`, { method: 'GET' })
    }

    const { data } = useQuery<Question[], Error>({
        queryKey: ['questions', debouncedFilters],
        queryFn: () => fetchQuestionsWithFilter(debouncedFilters),
        enabled: isAnyFilterActive,
        staleTime: 5000,
    })

    useEffect(() => {
        setQuestions?.(data)
    }, [data, setQuestions])

    return (
        <Flex direction="row" gap="2" align="center" justify="between" className="w-full">
            <Flex direction="row" gap="2" align="center">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="h-[1.5rem] w-[7rem]"
                    draggable="false"
                />
                <Badge color="gray">Case</Badge>
            </Flex>

            <Flex direction="row" gap="2" align="center">
                <TextField.Root
                    className="w-[5.625rem]"
                    placeholder="Context N..."
                    value={filters.context_name}
                    onChange={e => handleFilterChange('context_name', e.target.value)}
                />

                {selectOptions('course_name', 'Course Name', COURSE_NAME, handleFilterChange, filters.course_name)}
                {selectOptions('difficulty_level', 'Difficulty Level', DIFFICULTY_LEVEL, handleFilterChange, filters.difficulty_level)}
                {selectOptions('cognitive_level', 'Cognitive Level', COGNITIVE_LEVEL, handleFilterChange, filters.cognitive_level)}

                <TextField.Root
                    placeholder="Search the question…"
                    value={filters.question_text}
                    onChange={e => handleFilterChange('question_text', e.target.value)}
                >
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>

                {isAnyFilterActive && (
                    <Button variant="soft" color="gray" onClick={handleClearFilters}>
                        <Cross1Icon />
                    </Button>
                )}
            </Flex>
        </Flex>
    )
}

export default TableHeader
