import type { Question } from '../types/question'
import { Flex, Table } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import fetcher from '../utils/api'
import DeleteDialog from './dialogs/Delete'
import EditDialog from './dialogs/Edit'
import EmptyState from './EmptyState'

async function fetchQuestions() {
    return fetcher('/questions')
}

function TableContent() {
    const { data, error, isLoading } = useQuery({ queryKey: ['questions'], queryFn: fetchQuestions })

    if (isLoading)
        return <div>Loading...</div>
    if (error)
        return <EmptyState />

    return (
        <Table.Root variant="surface" className="w-full">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Question ID</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Question Text</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Difficulty Level</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Cognitive Level</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Course Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        <span className="sr-only">Actions</span>
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                { data.map((question: Question) => (
                    <Table.Row key={question.id}>
                        <Table.Cell>{question.id}</Table.Cell>
                        <Table.Cell className="max-w-5 truncate">{question.questionText}</Table.Cell>
                        <Table.Cell className="capitalize">{question.difficultyLevel}</Table.Cell>
                        <Table.Cell className="capitalize">{question.cognitiveLevel}</Table.Cell>
                        <Table.Cell className="capitalize">{question.courseName}</Table.Cell>
                        <Table.Cell align="right">
                            <Flex direction="row" className="w-full flex gap-2 justify-end items-center">
                                <EditDialog id={question.id} />
                                <DeleteDialog id={question.id} />
                            </Flex>
                        </Table.Cell>
                    </Table.Row>
                )) }

            </Table.Body>
        </Table.Root>

    )
}

export default TableContent
