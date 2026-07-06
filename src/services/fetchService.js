import { supabase } from "./supabaseClient";

export default function FetchService() {
  async function getTweets() {
    const { data, error } = await supabase
      .from("Tweets")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: data || [],
    };
  }

  async function postTweet(content, userName) {
    const payload = {
      content,
      userName,
      date: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("Tweets")
      .insert(payload)
      .select();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: data?.[0],
    };
  }

  return {
    getTweets,
    postTweet,
  };
}