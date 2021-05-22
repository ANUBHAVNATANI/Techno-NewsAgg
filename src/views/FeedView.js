import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Loader } from 'semantic-ui-react'

import { Context } from '../store/Store'
import FeedItemList from '../components/FeedItemList'
import { fetchFeed } from '../modules/feedparser'

export default function FeedView() {
	const [state, dispatch] = useContext(Context)
	const query = useQuery('feed-list', () => fetchFeed(state.feedSourceUrlList[0]))
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
			{/* {state.feedSourceCount > 0 && Object.keys(state.feedDataStore).length === state.feedSourceCount && ( */}
			{query.isLoading && (
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh' }}>
					<Loader active />
				</div>
			)}
			{query.isSuccess && <FeedItemList feed={query.data} />}
			{/* )} */}
		</>
	)
}
