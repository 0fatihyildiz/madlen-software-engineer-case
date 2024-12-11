import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Badge, Flex, Select, TextField } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { COGNITIVE_LEVEL, COURSE_NAME, DIFFICULTY_LEVEL } from '../constants/table'
import fetcher from '../utils/api'

function TableHeader() {
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

    // API function
    async function fetchQuestions(filters: Record<string, string>) {
        return fetcher(`/questions?${new URLSearchParams(filters).toString()}`, {
            method: 'GET',
        })
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['questions', debouncedFilters],
        queryFn: () => fetchQuestions(debouncedFilters),
        enabled: !!debouncedFilters,
        staleTime: 5000,
    })

    // Update filters
    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }))
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
            {/* Left section: Logo and badge */}
            <Flex direction="row" gap="2" align="center">
                <img src="/logo.png" alt="logo" className="h-[2.0625rem] w-[9.6875rem]" draggable="false" />
                <Badge color="gray">Case</Badge>
            </Flex>

            {/* Right section: Filters */}
            <Flex direction="row" gap="2" align="center">
                <TextField.Root placeholder="Context N..." className="w-[5.625rem]" onChange={e => handleFilterChange('context_name', e.target.value)} />
                {renderSelect('course_name', 'Course Name', COURSE_NAME)}
                {renderSelect('difficulty_level', 'Difficulty Level', DIFFICULTY_LEVEL)}
                {renderSelect('cognitive_level', 'Cognitive Level', COGNITIVE_LEVEL)}
                <TextField.Root placeholder="Search the question…" onChange={e => handleFilterChange('question_text', e.target.value)}>
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
            </Flex>
        </Flex>
    )
}

export default TableHeader
