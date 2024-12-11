import { Flex } from '@radix-ui/themes'
import { useContext } from 'react'
import TableContent from '../components/TableContent'
import TableHeader from '../components/TableHeader'
import TablePagination from '../components/TablePagination'
import { GeneralContext } from '../context/GeneralContext'

function Home() {
    const { questions } = useContext(GeneralContext)

    return (
        <Flex direction="column" gap="2" className="h-full w-full bg-olive-1 py-12 px-5" align="center">
            <Flex direction="column" gap="6" align="center" className="max-w-[60rem] w-full mx-auto">
                <TableHeader />

                <Flex direction="column" gap="2" className="w-full">
                    <TableContent />
                    {questions?.metadata && <TablePagination />}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Home
