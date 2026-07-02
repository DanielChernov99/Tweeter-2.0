import {useState,useEffect} from 'react'
import {Container,Stack} from '@mantine/core';
import TweetsContainer from '../components/TweetsContainer';


const mockTweets = [
    {
        id: "1",
        userName: "yonatan",
        date: "2019-12-15T14:40:58.340Z",
        content:
        "On the technical side, Microsoft says the Xbox Series X can handle 4K visuals at 60 frames per second, and potentially up to 120FPS.",
    },
    {
        id: "2",
        userName: "yonatan",
        date: "2019-12-15T14:40:11.083Z",
        content: "hello there",
    },
    {
        id: "3",
        userName: "yonatan",
        date: "2019-12-15T14:40:58.340Z",
        content: "another tweet text",
    },
];

export default function HomePage(){
    
    const [tweets,setTweets] = useState(mockTweets)


    return (
        <Container size="sm" py="xl">
            <Stack gap="md">
                <TweetsContainer tweets={tweets}/>
            </Stack>
        </Container>
    )

}