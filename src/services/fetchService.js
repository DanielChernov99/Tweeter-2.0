


export default function FetchService(){
    async function getTweets() {
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
            return data
               
        } catch (error) {
            alert("Something wen't wrong when fetching data")
        }                    
    }

    async function postTweet(content,userName) {

        const url = "https://lrazzxpwhdtmxcetgtng.supabase.co/rest/v1/Tweets?apikey=sb_publishable_PYoOQaHg4j7ps7Vo5Br41Q_QfmiyPSB"
        const payload = {
            content,
            userName
        }
        try {
            const response = await fetch(url,{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(payload)
                }
            )
            if (!response.ok) {
                console.log(`HTTP error! Status: ${response.status}`);
                return false
            } 
            return true

        } catch (error) {
            alert("Something wen't wrong when POSTING data")
            return false
        }
        
    }
    return {
        getTweets,
        postTweet
    }

}


