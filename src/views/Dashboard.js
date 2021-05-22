import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import LeftBar from '../components/LeftBar';
import Store from '../store/Store';
import CollectionsView from './CollectionsView';
import FeedView from './FeedView';
import Settings from './Settings';
import Shop from './Shop';

function Dashboard() {
	const { url } = useRouteMatch();
	return (
		<Store>
			<LeftBar />
			<Switch>
				<Route path="/feed">
					<FeedView />
				</Route>
				<Route path="/settings">
					<Settings />
				</Route>
				<Route path="/shop">
					<Shop />
				</Route>
				<Route path="/:collection">
					<CollectionsView />
				</Route>
			</Switch>
		</Store>
	);
}

export default Dashboard;
