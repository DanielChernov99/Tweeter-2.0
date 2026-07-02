import { Textarea ,Paper,Button,Group,Text} from '@mantine/core';
import { useState } from 'react';

const MAX_TWEET_LENGTH = 140;
// error="The tweet can't contain more then 140 chars"

export default function NewTweetBox({addTweet,isAddingTweet }) {
    const [input,setInput] = useState("")
    const isTooLong = input.length > MAX_TWEET_LENGTH;
    const isEmpty = input.trim().length === 0;

    const handleTweet = async () => {
        if (isTooLong || isEmpty || isAddingTweet) return;

        const success = await addTweet(input.trim());

        if (success) {
            setInput("");
        }
        };

  return (
    <Paper withBorder radius="md" p="sm">
      <Textarea
        value={input}
        onChange={(event) => setInput(event.currentTarget.value)}
        minRows={4}
        variant="unstyled"
        placeholder="What you have in mind..."
      />

      <Group justify="space-between" mt="xs">
        <Text size="xs" c={isTooLong ? "red" : "dimmed"}>
          {input.length}/{MAX_TWEET_LENGTH}
        </Text>
        {isTooLong && (
            <Text size="xs" c="red" mt="xs">
            The tweet can't contain more than 140 chars
            </Text>
        )}       
        <Button
            onClick={handleTweet}
            disabled={isTooLong || isEmpty || isAddingTweet}
            loading={isAddingTweet}
            >
            Tweet
            </Button>
      </Group>

    </Paper>
    
    
  );
}