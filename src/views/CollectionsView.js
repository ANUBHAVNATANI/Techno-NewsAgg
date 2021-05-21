import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/Store";
import FeedItemList from "../components/FeedItemList";
export default function CollectionsView(props) {
  const [state, dispatch] = useContext(Context);
  const [feedList, setFeedList] = useState([]);
  useEffect(() => {
    if (props.collectionName !== undefined) {
      try {
        let sourceList = state.collections[props.collectionName];
        let tempFeedList = [];
        // if (feedList.length === 0) {
        for (let i = 0; i < sourceList.length; i++) {
          tempFeedList = [
            ...tempFeedList,
            ...state.feedDataStore[sourceList[i]]
          ];
          //setFeedList(tempFeedList);
        }
        tempFeedList = tempFeedList.sort((a, b) => b.date - a.date);
        setFeedList(tempFeedList);
        // } else {
        //   let tempFeedList = [
        //     ...feedList,
        //     ...state.feedDataStore[sourceList[sourceList.length - 1]]
        //   ];
        //   setFeedList(tempFeedList);
        // }
        //setFeedList(feedList.sort((a, b) => b.date - a.date));
      } catch (error) {
        console.log(error);
      }
    }
  }, [state.collections[props.collectionName]]);
  return <FeedItemList feed={feedList} />;
}
///conditional fast update code think
