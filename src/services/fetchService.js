export default function FetchService() {
    async function getTweets() {
        try {
            const response = await fetch(
                'https://lrazzxpwhdtmxcetgtng.supabase.co/rest/v1/Tweets?apikey=sb_publishable_PYoOQaHg4j7ps7Vo5Br41Q_QfmiyPSB'
            );

            if (!response.ok) {
                return {
                    success: false,
                    error: `Failed to load tweets. Status: ${response.status}`
                };
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                return {
                    success: false,
                    error: "Tweets data is not valid"
                };
            }

            return {
                success: true,
                data
            };

        } catch (error) {
            return {
                success: false,
                error: "Network error while loading tweets"
            };
        }
    }

    async function postTweet(content, userName) {
        const url = "https://lrazzxpwhdtmxcetgtng.supabase.co/rest/v1/Tweets?apikey=sb_publishable_PYoOQaHg4j7ps7Vo5Br41Q_QfmiyPSB";

        const payload = {
            content,
            userName
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                return {
                    success: false,
                    error: `Failed to create tweet. Status: ${response.status}`
                };
            }

            return {
                success: true
            };

        } catch (error) {
            return {
                success: false,
                error: "Network error while creating tweet"
            };
        }
    }

    return {
        getTweets,
        postTweet
    };
}