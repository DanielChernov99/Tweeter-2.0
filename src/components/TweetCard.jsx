import { Card, Text, Group } from '@mantine/core';


export default function TweetCard({tweet}){
    return (
        <Card radius="md" shadow="sm" p="md" withBorder>
        <Group justify="space-between" mb="sm">
            <Text size="sm" c="dimmed">
            {tweet.userName}
            </Text>

            <Text size="xs" c="dimmed">
            {tweet.date}
            </Text>
        </Group>
        <Text>{tweet.content}</Text>
        </Card>
    )
}