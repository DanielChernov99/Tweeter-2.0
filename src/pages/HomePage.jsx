import {useState,useEffect,useMemo} from 'react'
import {Container,Stack,Notification,Loader} from '@mantine/core';
import TweetsContainer from '../components/TweetsContainer';
import NewTweetBox from '../components/NewTweetBox';
import FetchService from '../services/fetchService';
import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react';

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

export default function HomePage({userName}){
    
    const [tweets,setTweets] = useState([])
    const [isFetchingTweets, setIsFetchingTweets] = useState(false);
    const [isAddingTweet, setIsAddingTweet] = useState(false);
    const [notification, setNotification] = useState(null);
    
    const fs = FetchService()

    useEffect(() => {
        fetchTweets()          
    },[])

    
    async function fetchTweets() {
        setIsFetchingTweets(true);

        const result = await fs.getTweets();

        if (!result.success) {
            setNotification({
            type: "error",
            title: "oh no!",
            message: result.error
            });

            setIsFetchingTweets(false);
            return;
        }

        setTweets(result.data);
        setIsFetchingTweets(false);
        }

    const sortedTweets = useMemo(() => {
        return [...tweets].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [tweets]);

    const addTweet = async (tweetText) => {
        setIsAddingTweet(true);

        setNotification({
            type: "loading",
            title: "Loading the new HOT Tweets",
            message: ""
        });

        const result = await fs.postTweet(tweetText, userName);

        if (!result.success) {
            setNotification({
            type: "error",
            title: "Oh no!",
            message: result.error
            });

            setIsAddingTweet(false);
            return false;
        }

        await fetchTweets();

        setNotification({
            type: "success",
            title: "All good!",
            message: "Tweet was created successfully"
        });

        setIsAddingTweet(false);
        return true;
        };

    function renderNotification() {
        if (!notification) {
            return null;
        }

        if (notification.type === "loading") {
            return (
                <Notification
                    loading
                    withCloseButton={false}
                    color="teal"
                    radius="lg"
                    title={notification.title}
                >
                    {notification.message}
                </Notification>
            );
        }

        if (notification.type === "success") {
            return (
                <Notification
                    icon={<CheckCircleIcon size={24} weight="fill" />}
                    color="teal"
                    title={notification.title}
                    onClose={() => setNotification(null)}
                >
                    {notification.message}
                </Notification>
            );
        }

        if (notification.type === "error") {
            return (
                <Notification
                    icon={<XCircleIcon size={24} weight="fill" />}
                    color="red"
                    title={notification.title}
                    onClose={() => setNotification(null)}
                >
                    {notification.message}
                </Notification>
            );
        }

        return null;
    }

    

    return (
        <Container size="sm" py="xl">
            <Stack gap="md">
            <NewTweetBox addTweet={addTweet} isAddingTweet={isAddingTweet} />

            {renderNotification()}

            {isFetchingTweets ? (
                <Loader />
            ) : (
                <TweetsContainer tweets={sortedTweets} />
            )}
            </Stack>
        </Container>
        )

}