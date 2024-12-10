import { Button, Flex, Text } from '@radix-ui/themes'

function Home() {
    return (
        <Flex direction="column" gap="2">
            <Text>Hello from Radix Themes </Text>
            <Button>Let's go</Button>
        </Flex>
    )
}

export default Home