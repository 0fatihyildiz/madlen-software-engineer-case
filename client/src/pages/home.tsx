import { Flex } from '@radix-ui/themes'
import TableHeader from '../components/TableHeader'

function Home() {
    return (
        <Flex direction="column" gap="2" className="h-full w-full bg-olive-1" justify="center" align="center">
            <Flex direction="row" gap="2" align="center" className="max-w-[60rem] w-full mx-auto">
                <TableHeader />
            </Flex>
        </Flex>
    )
}

export default Home
