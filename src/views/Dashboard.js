import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LeftBar from '../components/LeftBar';
import Store from '../store/Store';
import CollectionsView from './CollectionsView';
import FeedView from './FeedView';
import Settings from './Settings';
import Shop from './Shop';

function Dashboard() {
	return (
		<Store>
			<LeftBar />
			<Routes>
				<Route path="/" element={<FeedView />} />
				<Route path="settings" element={<Settings />} />
				<Route path="shop" element={<Shop />} />
				{/* <Route path="/:collection">
					<CollectionsView />
				</Route> */}
			</Routes>
		</Store>
	);
}

export default Dashboard;
