import type { QuestionUpdate } from '../../types/question'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { COGNITIVE_LEVEL, COURSE_NAME, DIFFICULTY_LEVEL } from '../../constants/table'
import { GeneralContext } from '../../context/GeneralContext'
import fetcher from '../../utils/api'

interface Props {
    id: string
}

async function editQuestion({ id, data }: { id: string, data: QuestionUpdate }) {
    return fetcher(`/questions/${id}/edit`, { method: 'POST', body: JSON.stringify(data) })
}

async function fetchQuestionsById({ id }: { id: string }) {
    return fetcher(`/questions/${id}`, { method: 'GET' })
}

function EditDialog({ id }: Props) {
    const { fetchQuestions } = useContext(GeneralContext)

    const { mutate } = useMutation({
        mutationFn: editQuestion,
        onSuccess: () => {
            fetchQuestions()
            toast.success('Question updated successfully')
        },
        onError: () => {
            toast.error('An error occurred while updating the question')
        },
    })

    const [questionText, setQuestionText] = useState('')
    const [difficultyLevel, setDifficultyLevel] = useState('')
    const [cognitiveLevel, setCognitiveLevel] = useState('')
    const [courseName, setCourseName] = useState('')

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="soft" color="gray">
                    <Pencil1Icon />
                </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit Question</Dialog.Title>

                <QuestionForm
                    id={id}
                    questionText={questionText}
                    setQuestionText={setQuestionText}
                    difficultyLevel={difficultyLevel}
                    setDifficultyLevel={setDifficultyLevel}
                    cognitiveLevel={cognitiveLevel}
                    setCognitiveLevel={setCognitiveLevel}
                    courseName={courseName}
                    setCourseName={setCourseName}
                    mutate={mutate}
                />
            </Dialog.Content>
        </Dialog.Root>
    )
}

interface QuestionFormProps {
    id: string
    questionText: string
    setQuestionText: (value: string) => void
    difficultyLevel: string
    setDifficultyLevel: (value: string) => void
    cognitiveLevel: string
    setCognitiveLevel: (value: string) => void
    courseName: string
    setCourseName: (value: string) => void
    mutate: (variables: { id: string, data: QuestionUpdate }) => void
}

function QuestionForm({ id, questionText, setQuestionText, difficultyLevel, setDifficultyLevel, cognitiveLevel, setCognitiveLevel, courseName, setCourseName, mutate }: QuestionFormProps) {
    const { data, error, isLoading } = useQuery({
        queryKey: ['question', id],
        queryFn: () => fetchQuestionsById({ id }),
    })

    useEffect(() => {
        if (data) {
            setQuestionText(data.questionText || '')
            setDifficultyLevel(data.difficultyLevel || '')
            setCognitiveLevel(data.cognitiveLevel || '')
            setCourseName(data.courseName || '')
        }
    }, [data])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading question!</div>
    }

    return (
        <Flex direction="column" gap="3">
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                    Question Text
                </Text>
                <TextField.Root value={questionText} onChange={e => setQuestionText(e.target.value)} placeholder="Enter your question text" />
            </label>

            <Flex direction="row" gap="2" align="center" className="w-full">
                <label className="w-full">
                    <Text as="div" size="2" mb="1" weight="bold">
                        Difficulty Level
                    </Text>
                    <Select.Root value={difficultyLevel} onValueChange={value => setDifficultyLevel(value)}>
                        <Select.Trigger className="capitalize w-full" placeholder="Difficulty Level" />
                        <Select.Content className="h-auto">
                            <Select.Group>
                                <Select.Label>Difficulty Level</Select.Label>
                                {DIFFICULTY_LEVEL.map(level => (
                                    <Select.Item key={level} className="capitalize" value={level}>
                                        {level}
                                    </Select.Item>
                                ))}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </label>

                <label className="w-full">
                    <Text as="div" size="2" mb="1" weight="bold">
                        Cognitive Level
                    </Text>
                    <Select.Root value={cognitiveLevel} onValueChange={value => setCognitiveLevel(value)}>
                        <Select.Trigger className="capitalize w-full" placeholder="Cognitive Level" />
                        <Select.Content className="h-auto">
                            <Select.Group>
                                <Select.Label>Cognitive Level</Select.Label>
                                {COGNITIVE_LEVEL.map(level => (
                                    <Select.Item key={level} className="capitalize" value={level}>
                                        {level}
                                    </Select.Item>
                                ))}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </label>
            </Flex>

            <label className="w-full">
                <Text as="div" size="2" mb="1" weight="bold">
                    Course Name
                </Text>
                <Select.Root value={courseName.toLocaleLowerCase()} onValueChange={value => setCourseName(value)}>
                    <Select.Trigger className="capitalize w-full" placeholder="Course Name" />
                    <Select.Content className="h-auto">
                        <Select.Group>
                            <Select.Label>Course Name</Select.Label>
                            {COURSE_NAME.map(name => (
                                <Select.Item key={name} className="capitalize" value={name}>
                                    {name}
                                </Select.Item>
                            ))}
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </label>

            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button variant="soft" color="gray">
                        Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close
                    onClick={() =>
                        mutate({
                            id,
                            data: {
                                questionText,
                                difficultyLevel,
                                cognitiveLevel,
                                courseName,
                            },
                        })}
                >
                    <Button>Save</Button>
                </Dialog.Close>
            </Flex>
        </Flex>
    )
}

export default EditDialog
