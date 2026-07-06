import { createContext, useContext, useEffect, useMemo, useState } from "react";
import FetchService from "../services/fetchService";
import { useUser } from "./UserContext";

const TweetsContext = createContext();

export function TweetsProvider({ children }) {
  const { userName } = useUser();

  const [tweets, setTweets] = useState([]);
  const [isFetchingTweets, setIsFetchingTweets] = useState(false);
  const [isAddingTweet, setIsAddingTweet] = useState(false);
  const [notification, setNotification] = useState(null);

  const fs = FetchService();

  useEffect(() => {
    fetchTweets();

    const intervalId = setInterval(() => {
      fetchTweets();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  async function fetchTweets() {
    setIsFetchingTweets(true);

    const result = await fs.getTweets();

    if (!result.success) {
      setNotification({
        type: "error",
        title: "oh no!",
        message: result.error,
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

  async function addTweet(tweetText) {
    setIsAddingTweet(true);

    setNotification({
      type: "loading",
      title: "Loading the new HOT Tweets",
      message: "",
    });

    const result = await fs.postTweet(tweetText, userName);

    if (!result.success) {
      setNotification({
        type: "error",
        title: "Oh no!",
        message: result.error,
      });

      setIsAddingTweet(false);
      return false;
    }

    const newTweet = {
      id: crypto.randomUUID(),
      content: tweetText,
      userName,
      date: new Date().toISOString(),
    };

    setTweets((prevTweets) => [newTweet, ...prevTweets]);

    setNotification({
      type: "success",
      title: "All good!",
      message: "Tweet was created successfully",
    });

    setIsAddingTweet(false);
    return true;
  }

  function clearNotification() {
    setNotification(null);
  }

  return (
    <TweetsContext.Provider
      value={{
        tweets: sortedTweets,
        isFetchingTweets,
        isAddingTweet,
        notification,
        addTweet,
        clearNotification,
      }}
    >
      {children}
    </TweetsContext.Provider>
  );
}

export function useTweets() {
  return useContext(TweetsContext);
}