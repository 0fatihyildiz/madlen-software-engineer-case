import { EyeOpenIcon } from '@radix-ui/react-icons'
import { Button, Dialog } from '@radix-ui/themes'
import { Viewer } from '@react-pdf-viewer/core'

function View() {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="soft" color="blue">
                    <EyeOpenIcon />
                </Button>
            </Dialog.Trigger>
            <Dialog.Content size="4" className="max-h-[650px] overflow-y-auto">
                <Viewer fileUrl="/course_content.pdf" />
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default View
