import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/Store";
import FeedItemList from "../components/FeedItemList";

export default function FeedView() {
  const [state, dispatch] = useContext(Context);
  // const allFeedList = state.feedSourceUrlList.map((item) => (
  //   <FeedItemList feed={state.feedDataStore[item]} />
  // ));
  //const [feedSourceToRender, setFeedSourceToRender] = useState(0);
  // useEffect(() => {
  //   try {
  //     if (
  //       state.feedSourceCount > 0 &&
  //       state.feedSourceUrlList.length === state.feedSourceCount &&
  //       Object.keys(state.feedDataStore).length === state.feedSourceCount
  //     ) {
  //       setFeedSourceToRender(feedSourceToRender + 1);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [state.feedDataStore]);
  return (
    <>
      {state.feedSourceCount > 0 &&
        Object.keys(state.feedDataStore).length === state.feedSourceCount && (
          <FeedItemList feed={state.allFeedList} />
        )}
    </>
  );
}
