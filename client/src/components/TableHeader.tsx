import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Badge, Flex, Select, TextField } from '@radix-ui/themes'
import { COGNITIVE_LEVEL, COURSE_NAME, DIFFICULTY_LEVEL } from '../constants/table'

function TableHeader() {
    return (
        <Flex direction="row" gap="2" align="center" justify="between" className="w-full">
            <Flex direction="row" gap="2" align="center">
                <img src="/logo.png" alt="logo" className="h-[2.0625rem] w-[9.6875rem]" draggable="false" />
                <Badge color="gray">Case</Badge>
            </Flex>

            <Flex direction="row" gap="2" align="center">
                <TextField.Root placeholder="Context Number" />

                <Select.Root>
                    <Select.Trigger className="capitalize" placeholder="Course Name" />
                    <Select.Content className="h-auto">
                        <Select.Group>
                            <Select.Label>Course Name</Select.Label>
                            { COURSE_NAME.map(level => <Select.Item key={level} className="capitalize" value={level}>{level}</Select.Item>) }
                        </Select.Group>
                    </Select.Content>
                </Select.Root>

                <Select.Root>
                    <Select.Trigger className="capitalize" placeholder="Difficulty Level" />
                    <Select.Content className="h-auto">
                        <Select.Group>
                            <Select.Label>Difficulty Level</Select.Label>
                            { DIFFICULTY_LEVEL.map(level => <Select.Item key={level} className="capitalize" value={level}>{level}</Select.Item>) }
                        </Select.Group>
                    </Select.Content>
                </Select.Root>

                <Select.Root>
                    <Select.Trigger className="capitalize" placeholder="Cognitive Level" />
                    <Select.Content className="h-auto">
                        <Select.Group>
                            <Select.Label>Cognitive Level</Select.Label>
                            { COGNITIVE_LEVEL.map(level => <Select.Item key={level} className="capitalize" value={level}>{level}</Select.Item>) }
                        </Select.Group>
                    </Select.Content>
                </Select.Root>

                <TextField.Root placeholder="Search the question…">
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
            </Flex>
        </Flex>
    )
}

export default TableHeader
