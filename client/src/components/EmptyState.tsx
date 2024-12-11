import { Flex } from '@radix-ui/themes'

function EmptyState() {
    return (
        <Flex direction="column" gap="2" className="h-full w-full bg-olive-1 py-12 px-5" align="center">
            <Flex direction="column" gap="6" align="center" className="max-w-[60rem] w-full mx-auto">
                <img src="/empty.svg" alt="empty" className="h-[12.5rem] w-[12.5rem]" draggable="false" />
                <p className="text-3 text-slate-8">No questions found. Please try again later.</p>
            </Flex>
        </Flex>
    )
}

export default EmptyState
