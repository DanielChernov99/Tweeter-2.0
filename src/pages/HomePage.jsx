import {useState,useEffect,useMemo} from 'react'
import {Container,Stack} from '@mantine/core';
import TweetsContainer from '../components/TweetsContainer';
import NewTweetBox from '../components/NewTweetBox';
import FetchService from '../services/fetchService';

const mockUserName = "Daniel Chernov";
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
    const [error,setError] = useState(false)
    
    const fs = FetchService()

    useEffect(() => {
        fetchTweets()          
    },[])

    
    async function fetchTweets() {
        try {
            setIsLoading(true);
            setError(false);

            const data = await fs.getTweets()
            setTweets(data || [])

        } catch (error) {
            setError(true);
        }
        finally{
            setIsLoading(false)
        }
        
    }

    const sortedTweets = useMemo(() => {
        return [...tweets].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [tweets]);

    const addTweet = async (tweetText) =>{
        const newTweet = {
            // id:crypto.randomUUID(),
            userName:mockUserName,
            content:tweetText,
            // date: new Date().toISOString()
        }        
        const isSuccessful  = await fs.postTweet(newTweet.content,newTweet.userName) 
        if(isSuccessful){
            await fetchTweets()
        }

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