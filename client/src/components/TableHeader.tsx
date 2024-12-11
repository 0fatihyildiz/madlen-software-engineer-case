import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Badge, Button, Flex, Select, TextField } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { COGNITIVE_LEVEL, COURSE_NAME, DIFFICULTY_LEVEL } from '../constants/table'
import { GeneralContext } from '../context/GeneralContext'
import fetcher from '../utils/api'

function TableHeader() {
    const { setQuestions, fetchQuestions } = useContext(GeneralContext)

    const [filters, setFilters] = useState({
        course_name: '',
        difficulty_level: '',
        cognitive_level: '',
        question_text: '',
        context_name: '',
    })

    const [debouncedFilters, setDebouncedFilters] = useState(filters)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters)
        }, 500)
        return () => clearTimeout(handler)
    }, [filters])

    const isAnyFilterActive = Object.values(debouncedFilters).some(value => value.trim() !== '')

    async function fetchQuestionsWithFilter(filters: Record<string, string>) {
        return fetcher(`/questions?${new URLSearchParams(filters).toString()}`, {
            method: 'GET',
        })
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['questions', debouncedFilters],
        queryFn: () => fetchQuestionsWithFilter(debouncedFilters),
        enabled: isAnyFilterActive,
        staleTime: 5000,
    })

    useEffect(() => {
        if (!error && !isLoading && data) {
            setQuestions?.(data)
        }
    }, [data, error, isLoading, setQuestions])

    useEffect(() => {
        if (isAnyFilterActive && fetchQuestions) {
            fetchQuestions()
        }
    }, [isAnyFilterActive, fetchQuestions])

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const handleClearFilters = () => {
        setFilters({
            course_name: '',
            difficulty_level: '',
            cognitive_level: '',
            question_text: '',
            context_name: '',
        })
    }

    const renderSelect = (key: string, placeholder: string, options: string[]) => (
        <Select.Root onValueChange={value => handleFilterChange(key, value)}>
            <Select.Trigger className="capitalize" placeholder={placeholder} />
            <Select.Content className="h-auto">
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

    return (
        <Flex direction="row" gap="2" align="center" justify="between" className="w-full">
            <Flex direction="row" gap="2" align="center">
                <img src="/logo.png" alt="logo" className="h-[2.0625rem] w-[9.6875rem]" draggable="false" />
                <Badge color="gray">Case</Badge>
            </Flex>

            <Flex direction="row" gap="2" align="center">
                <TextField.Root
                    className="w-[5.625rem]"
                    placeholder="Context N..."
                    onChange={e => handleFilterChange('context_name', e.target.value)}
                />
                {renderSelect('course_name', 'Course Name', COURSE_NAME)}
                {renderSelect('difficulty_level', 'Difficulty Level', DIFFICULTY_LEVEL)}
                {renderSelect('cognitive_level', 'Cognitive Level', COGNITIVE_LEVEL)}
                <TextField.Root
                    placeholder="Search the question…"
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
