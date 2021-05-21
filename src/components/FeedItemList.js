import React from "react";
import FeedItem from "./FeedItem";
//import { Card } from "semantic-ui-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
//import "./masonry.css";

export default function FeedItemList(props) {
  console.log(props);
  const FeedListItems = props.feed.map((item) => (
    <FeedItem feedData={item} key={item.guid} />
  ));
  return (
    <>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 225: 1, 450: 2, 675: 3, 900: 4 }}
      >
        <Masonry columnsCount={4}>{FeedListItems}</Masonry>
      </ResponsiveMasonry>
    </>
  );
}
