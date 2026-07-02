import TweetCard from "./TweetCard";
import { Stack} from '@mantine/core';


export default function TweetsContainer({tweets}){
    return (
       <Stack
            h={300}
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