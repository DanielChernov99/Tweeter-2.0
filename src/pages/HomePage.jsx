import {useState,useEffect,useMemo} from 'react'
import {Container,Stack} from '@mantine/core';
import TweetsContainer from '../components/TweetsContainer';
import NewTweetBox from '../components/NewTweetBox';

const mockUserName = "yonatan";
const mockTweets = [
    {
        id: "1",
        userName: "yonatan",
        date: "2019-12-15T14:40:58.340Z",
        text:
        "On the technical side, Microsoft says the Xbox Series X can handle 4K visuals at 60 frames per second, and potentially up to 120FPS.",
    },
    {
        id: "2",
        userName: "yonatan",
        date: "2019-12-15T14:40:11.083Z",
        text: "hello there",
    },
    {
        id: "3",
        userName: "yonatan",
        date: "2019-12-15T14:40:58.340Z",
        text: "another tweet text",
    },
];

export default function HomePage(){
    
    const [tweets,setTweets] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch('https://lrazzxpwhdtmxcetgtng.supabase.co/rest/v1/Tweets?apikey=sb_publishable_PYoOQaHg4j7ps7Vo5Br41Q_QfmiyPSB')
                if(!response.ok){
                    alert("Something wen't wrong")
                    return
                }
                const data = await response.json()                
                if(!Array.isArray(data)){                  
                    return
                }
                setTweets(data)
                
            } catch (error) {
                alert("Something wen't wrong when fetching data")
            }                    
        }
        getData()     
    },[])

    const sortedTweets = useMemo(() => {
        return [...tweets].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [tweets]);

    const addTweet = (tweetText) =>{
        const newTweet = {
            id:crypto.randomUUID(),
            userName:mockUserName,
            content:tweetText,
            date: new Date().toISOString()
        }
        setTweets(prev => [...prev, newTweet]);
    }

    return (
        <Container size="sm" py="xl">
            <Stack gap="md">
                <NewTweetBox addTweet={addTweet}/>
                <TweetsContainer tweets={sortedTweets}/>
            </Stack>
        </Container>
    )

}