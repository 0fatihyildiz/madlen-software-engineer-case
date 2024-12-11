import { Flex } from '@radix-ui/themes'
import TableContent from '../components/TableContent'
import TableHeader from '../components/TableHeader'
import TablePagination from '../components/TablePagination'

function Home() {
    return (
        <Flex direction="column" gap="2" className="h-full w-full bg-olive-1 py-12 px-5" align="center">
            <Flex direction="column" gap="6" align="center" className="max-w-[60rem] w-full mx-auto">
                <TableHeader />

                <Flex direction="column" gap="2" className="w-full">
                    <TableContent />
                    <TablePagination />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Home
