import TweetCard from "./TweetCard";
import { Stack} from '@mantine/core';


export default function TweetsContainer({tweets}){
    return (
       <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="flex-start"
            gap="sm"
            >
        {tweets.map(tweet => (
            <TweetCard key={tweet.id} tweet={tweet} />
        ))}
              
        </Stack>
    )
}