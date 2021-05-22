import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/Store';
import FeedItemList from '../components/FeedItemList';
import { useParams } from 'react-router-dom';
export default function CollectionsView() {
	const [state, dispatch] = useContext(Context);
	const [feedList, setFeedList] = useState([]);
	const { collection } = useParams();
	useEffect(() => {
		if (collection !== undefined) {
			try {
				let sourceList = state.collections[collection];
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
	}, [state.collections[collection]]);
	return <FeedItemList feed={feedList} />;
}
///conditional fast update code think
