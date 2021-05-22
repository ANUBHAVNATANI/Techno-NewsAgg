import React, { useEffect, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import LeftBar from '../components/LeftBar';
import Store from '../store/Store';
import CollectionsView from './CollectionsView';
import FeedView from './FeedView';
import Settings from './Settings';
import Shop from './Shop';
import { UserContext } from '../providers/userProvider';
import { createCollection, getUser, updateUser } from '../services/api';
import { fetchFeed } from '../modules/feedparser';
import { Context } from '../store/Store';

function Dashboard() {
	const [isLoading, setIsLoading] = useState(false);
	const [state, dispatch] = useContext(Context);

	const storeFeed = async (value) => {
		if (value in state.feedDataStore) {
			console.log('Already exist');
		} else {
			await dispatch({
				type: 'ADD_FEED_SOURCE',
				payload: value
			});
		}

		try {
			const feed = await fetchFeed(value);
			dispatch({ type: 'ADD_FEED_DATA', payload: [value, feed] });
			dispatch({ type: 'ADD_TO_FEED_LIST', payload: feed });
		} catch (err) {
			throw err;
		}
	};

	const { uid } = useContext(UserContext);
	useEffect(() => {
		setIsLoading(true);
		// const uid = 'EkvygLEVpqcHBJBz4cWxonPpc7x1';
		getUser(uid)
			.then((user) => {
				// user
				const feed = [];
				res.sources.forEach((source) => {
					feed.push(storeFeed(source));
				});
				console.log(feed);
				Promise.all(feed);
				// console.log('User>>', res);
				// createCollection({
				// 	name: 'github',
				// 	category: 'tech',
				// 	is_verified: true,
				// 	rating: '4.5',
				// 	sources: ['https://github.blog/all.atom']
				// }).then((newCollection) => {
				// 	console.log('newCollections>>>', newCollection);
				// 	updateUser({
				// 		...user,
				// 		collections: [
				// 			...user.collections,
				// 			{ id: newCollection.id, name: 'github' }
				// 		]
				// 	}).then((res) => console.log('Updated User>>>', res));
				// });
			})
			.catch((e) => console.error(e))
			.finally(() => setIsLoading(false));
	}, []);
	return (
		<>
			<LeftBar />
			<Routes>
				<Route path="/" element={<FeedView isLoading={isLoading} />} />
				<Route path="settings" element={<Settings />} />
				<Route path="shop" element={<Shop />} />
				<Route path=":collection" element={<CollectionsView />} />
			</Routes>
		</>
	);
}

export default Dashboard;
