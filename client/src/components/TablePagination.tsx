import type { Key } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import fetcher from '../utils/api'

async function fetchQuestions() {
    return fetcher(`/metadata`)
}

function TablePagination() {
    const { data, error, isLoading } = useQuery({ queryKey: ['metadata'], queryFn: fetchQuestions })

    if (isLoading)
        return <div>Loading...</div>

    if (error)
        return null

    return (
        <Flex direction="row" gap="2" className="w-full">
            { data?.map((_item: any, index: Key | null | undefined) => (
                <Button key={index} variant="outline" color="gray" className="text-sm">
                    {(index as number) + 1}
                </Button>
            ))}
        </Flex>
    )
}

export default TablePagination
