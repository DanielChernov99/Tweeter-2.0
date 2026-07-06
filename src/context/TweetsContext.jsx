import { createContext, useContext } from "react";


const TweetsContex = createContext(null)


export function TweetProvider({children}){




    return (
        <TweetContex.Provider>
            {children}
        </TweetContex.Provider>
    )
}

export function useTweets(){
    return useContext(TweetsContex)
}