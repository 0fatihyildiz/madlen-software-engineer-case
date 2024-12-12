import type { Question } from '../types/question'
import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Badge, Button, Flex, Select, TextField } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { COGNITIVE_LEVEL, COURSE_NAME, DIFFICULTY_LEVEL } from '../constants/table'
import { GeneralContext, initialFilters } from '../context/GeneralContext'

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
                        <Select.Item key={option} className="capitalize" value={option}>
                            {option}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

function TableHeader() {
    const { setQuestions, fetchQuestions, filters, setFilters, fetchQuestionsWithFilter } = useContext(GeneralContext)

    const debouncedFilters = useDebouncedValue(filters, 500)
    const isAnyFilterActive = debouncedFilters && Object.values(debouncedFilters).some(val => Array.isArray(val) ? val.length > 0 : val.trim() !== '')

    const handleFilterChange = (key: string, value: string) => {
        if (!setFilters)
            return

        setFilters(prev => ({
            ...prev,
            [key]: key === 'context_name' ? value.split(',') : value,
        }))
    }

    const handleClearFilters = () => {
        setFilters?.(initialFilters)
    }

    const { data } = useQuery<Question[], Error>({
        queryKey: ['questions', debouncedFilters],
        queryFn: () => debouncedFilters ? fetchQuestionsWithFilter?.(debouncedFilters) ?? Promise.resolve([]) : Promise.resolve([]),
        enabled: isAnyFilterActive,
        staleTime: 5000,
    })

    useEffect(() => {
        setQuestions?.(data)

        if (!isAnyFilterActive) {
            fetchQuestions()
        }
    }, [data, filters])

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
                    value={Array.isArray(filters?.context_name) ? filters.context_name.join(',') : filters?.context_name ?? ''}
                    onChange={e => handleFilterChange('context_name', e.target.value)}
                />

                {filters && selectOptions('course_name', 'Course Name', COURSE_NAME, handleFilterChange, Array.isArray(filters.course_name) ? filters.course_name.join(',') : filters.course_name ?? '')}
                {filters && selectOptions('difficulty_level', 'Difficulty Level', DIFFICULTY_LEVEL, handleFilterChange, Array.isArray(filters.difficulty_level) ? filters.difficulty_level.join(',') : filters.difficulty_level ?? '')}
                {filters && selectOptions('cognitive_level', 'Cognitive Level', COGNITIVE_LEVEL, handleFilterChange, Array.isArray(filters.cognitive_level) ? filters.cognitive_level.join(',') : filters.cognitive_level ?? '')}

                <TextField.Root
                    placeholder="Search the question…"
                    value={Array.isArray(filters?.question_text) ? filters.question_text.join(',') : filters?.question_text ?? ''}
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
