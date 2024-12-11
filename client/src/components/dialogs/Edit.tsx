import type { QuestionUpdate } from '../../types/question'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Select, Text, TextField } from '@radix-ui/themes'
import { useMutation } from '@tanstack/react-query'
import { COGNITIVE_LEVEL, COURSE_NAME, DIFFICULTY_LEVEL } from '../../constants/table'
import fetcher from '../../utils/api'

interface Props {
    id: string
}

async function editQuestion({ id, data }: { id: string, data: QuestionUpdate }) {
    return fetcher(`/questions/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

function EditDialog({ id }: Props) {
    const { mutate } = useMutation({
        mutationFn: editQuestion,
        onSuccess: () => {
        },
        onError: () => {
        },
    })

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="soft" color="gray">
                    <Pencil1Icon />
                </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit Question</Dialog.Title>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Question Text
                        </Text>
                        <TextField.Root
                            defaultValue="Freja Johnsen"
                            placeholder="Enter your full name"
                        />
                    </label>

                    <Flex direction="row" gap="2" align="center" className="w-full">
                        <label className="w-full">
                            <Text as="div" size="2" mb="1" weight="bold">
                                Difficulty Level
                            </Text>
                            <Select.Root defaultValue="apple">
                                <Select.Trigger className="capitalize w-full" placeholder="Difficulty Level" />
                                <Select.Content className="h-auto">
                                    <Select.Group>
                                        <Select.Label>Difficulty Level</Select.Label>
                                        { DIFFICULTY_LEVEL.map(level => <Select.Item key={level} className="capitalize" value={level}>{level}</Select.Item>) }
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </label>

                        <label className="w-full">
                            <Text as="div" size="2" mb="1" weight="bold">
                                Cognitive Level
                            </Text>
                            <Select.Root defaultValue="apple">
                                <Select.Trigger className="capitalize w-full" placeholder="Cognitive Level" />
                                <Select.Content className="h-auto">
                                    <Select.Group>
                                        <Select.Label>Cognitive Level</Select.Label>
                                        { COGNITIVE_LEVEL.map(level => <Select.Item key={level} className="capitalize" value={level}>{level}</Select.Item>) }
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </label>
                    </Flex>

                    <label className="w-full">
                        <Text as="div" size="2" mb="1" weight="bold">
                            Course Name
                        </Text>
                        <Select.Root defaultValue="apple">
                            <Select.Trigger className="capitalize w-full" placeholder="Course Name" />
                            <Select.Content className="h-auto">
                                <Select.Group>
                                    <Select.Label>Course Name</Select.Label>
                                    { COURSE_NAME.map(name => <Select.Item key={name} className="capitalize" value={name}>{name}</Select.Item>) }
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close onClick={() => mutate({ id, data: {} })}>
                        <Button>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default EditDialog
