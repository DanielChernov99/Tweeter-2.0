import TweetCard from "./TweetCard";
import { Stack } from "@mantine/core";
import { useTweets } from "../context/TweetsContext";

export default function TweetsContainer() {
  const { tweets } = useTweets();

  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="flex-start"
      gap="sm"
    >
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id || tweet.date} tweet={tweet} />
      ))}
    </Stack>
  );
}