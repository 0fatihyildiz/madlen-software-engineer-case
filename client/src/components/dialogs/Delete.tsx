import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'

interface Props {
    id: string
}

function DeleteDialog({ id }: Props) {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red" variant="soft">
                    <TrashIcon />
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Are You Sure?</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure you want to delete the question? This action cannot be undone.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red">
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteDialog
