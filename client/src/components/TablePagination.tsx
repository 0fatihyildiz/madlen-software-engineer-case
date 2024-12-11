import { Button, Flex } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { type Key, useContext } from 'react'
import { GeneralContext } from '../context/GeneralContext'

function TablePagination() {
    const { page, setPage, fetchMetaData } = useContext(GeneralContext)
    const { data, error, isLoading } = useQuery({ queryKey: ['metadata'], queryFn: fetchMetaData })

    if (isLoading)
        return <div>Loading...</div>

    if (error)
        return null

    function handlePageChange(page: number) {
        setPage(page)
    }

    return (
        <Flex direction="row" gap="2" className="w-full">
            { data?.map((_item: any, index: Key | null | undefined) => (
                <Button
                    key={index}
                    variant={page === (index as number) + 1 ? 'soft' : 'outline'}
                    color={page === (index as number) + 1 ? 'orange' : 'gray'}
                    className="text-sm"
                    onClick={() => handlePageChange((index as number) + 1)}
                >
                    {(index as number) + 1}
                </Button>
            ))}
        </Flex>
    )
}

export default TablePagination
