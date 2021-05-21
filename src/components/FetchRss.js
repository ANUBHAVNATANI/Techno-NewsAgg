import React, { useEffect, useContext } from "react";
import { Context } from "../store/Store";
//import RssParser from "rss-parser";
import feedparser from "feedparser-promised";

export default function FetchRss() {
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    // let parser = new RssParser({
    //   requestOptions: {
    //     rejectUnauthorized: false
    //   },
    //   defaultRSS: 2.0,
    //   headers: {
    //     "User-Agent": "NewsAgg"
    //   },
    //   customFields: {
    //     item: [
    //       "media:group",
    //       "media:title",
    //       "media:content",
    //       "media:description"
    //     ]
    //   }
    // });
    const fetchFeed = async () => {
      const CORS_PROXY = "https://cors-proxy-rss.herokuapp.com/";
      const url = state.feedSourceUrlList[state.feedSourceCount - 1];
      const CORS_URL = CORS_PROXY + url;
      try {
        //const feed = await parser.parseURL(CORS_URL);
        const feed = await feedparser.parse(CORS_URL);
        //if there is no error in accessing the rss of the requested url then we will store the url
        dispatch({ type: "ADD_FEED_DATA", payload: [url, feed] });
        //storing the feed data into the datastore
        //dispatch({ type: "STORE_FEED_DATA", payload: [url, feed] });
        // if (state.allFeedList.length > 0) {

        //   dispatch({ type: "ADD_TO_FEED_LIST", payload: currFeedList });
        //   console.log(currFeedList);
        // } else {
        dispatch({ type: "ADD_TO_FEED_LIST", payload: feed });
        //}
      } catch (err) {
        console.log(err);
      }
    };
    if (state.feedSourceCount > 0) {
      fetchFeed();
    }
  }, [state.feedSourceCount]);
  /*
  https://openai.com/blog/rss/
  https://deepmind.com/blog/feed/basic/
  https://github.blog/all.atom
  */
  return <div></div>;
}
