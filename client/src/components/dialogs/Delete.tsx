import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { toast } from 'sonner'
import { GeneralContext } from '../../context/GeneralContext'
import fetcher from '../../utils/api'

interface Props {
    id: string
}

async function deleteQuestion(id: string) {
    return fetcher(`/questions/${id}/delete`, {
        method: 'POST',
    })
}

function DeleteDialog({ id }: Props) {
    const { handleFilterChange } = useContext(GeneralContext)

    const { mutate } = useMutation({
        mutationFn: deleteQuestion,
        onSuccess: () => {
            handleFilterChange?.()
            toast.success('Question deleted successfully')
        },
        onError: () => {
            toast.error('An error occurred while deleting the question')
        },
    })

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red" variant="soft">
                    <TrashIcon />
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Are You Sure?</AlertDialog.Title>
                <AlertDialog.Description size="2" className="text-slate-10">
                    Are you sure you want to delete the question? This action cannot be undone.
                    {' '}
                    <b>{id}</b>
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action onClick={() => mutate(id)}>
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
