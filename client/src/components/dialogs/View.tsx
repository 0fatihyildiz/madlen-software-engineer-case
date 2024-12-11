import { EyeOpenIcon } from '@radix-ui/react-icons'
import { Button, Dialog } from '@radix-ui/themes'
import { Viewer } from '@react-pdf-viewer/core'
import course_content from '../../assets/course_content.pdf'

function View() {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="soft" color="blue">
                    <EyeOpenIcon />
                </Button>
            </Dialog.Trigger>
            <Dialog.Content size="4" className="max-h-[650px] overflow-y-auto">
                <Viewer fileUrl={course_content} />
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default View
