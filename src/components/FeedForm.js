import React, { useContext, useState } from 'react';
import { Context } from '../store/Store';
import feedparser from 'feedparser-promised';
import { Dropdown, Input, Form, Button, Card, Image } from 'semantic-ui-react';
import * as getFeeds from 'get-feeds';
import {
	fetchFeed,
	getRssLinkFromWebsite,
	keywordSearch,
	checkValidURL
} from '../modules/feedparser';

const CORS_PROXY = 'https://cors-proxy-rss.herokuapp.com/';
export default function FeedForm() {
	const [state, dispatch] = useContext(Context);
	const [userFeedUrl, setUserFeedUrl] = useState('');
	const [userFeed, setUserFeed] = useState(null);
	const [addCollectionsToggle, setAddCollectionsToggle] = useState(false);
	const [userMadeCollection, setUserMadeCollection] = useState('');
	const [userSelectedCollections, setUserSelectedCollections] = useState([]);
	const [searchQueryResult, setSearchQueryResults] = useState([]);
	const handleUrlChange = (e, { value }) => {
		setUserFeedUrl(value);
	};
	const handleCollectionChange = (e, { value }) => {
		setUserMadeCollection(value);
	};
	const handleSelectedCollectionChange = (e, { value }) => {
		setUserSelectedCollections(value);
	};
	const storeFeed = async (value, feed) => {
		if (value in state.feedDataStore) {
			console.log('Already exist');
		} else {
			await dispatch({
				type: 'ADD_FEED_SOURCE',
				payload: value
			});
		}
		try {
			dispatch({ type: 'ADD_FEED_DATA', payload: [value, feed] });
			dispatch({ type: 'ADD_TO_FEED_LIST', payload: feed });
		} catch (err) {
			throw err;
		}
	};
	const handleAddCollectionSubmit = () => {
		if (userMadeCollection !== '') {
			dispatch({
				type: 'ADD_TO_COLLECTIONS',
				payload: [[...userSelectedCollections, userMadeCollection], userFeedUrl]
			});
		} else {
			dispatch({
				type: 'ADD_TO_COLLECTIONS',
				payload: [userSelectedCollections, userFeedUrl]
			});
		}
	};
	const handleSubmit = () => {
		if (userFeedUrl != '') {
			storeFeed(userFeedUrl, userFeed);
			handleAddCollectionSubmit();
			setUserMadeCollection('');
			setUserFeedUrl('');
			setSearchQueryResults([]);
			setUserSelectedCollections('');
			setAddCollectionsToggle(false);
		} else {
			console.log('Nothing there');
			setUserMadeCollection('');
			setUserSelectedCollections('');
			setSearchQueryResults([]);
			setAddCollectionsToggle(false);
			//give user some response
		}
	};
	///some sought of feedback to user that it is done (ui-feat)

	///key word search feature for the user

	//search click for the keyword or site
	//whitespace case handle (2 word in company name or other source or else extra white space in front and back)

	///Extract the rss links form the given page

	/// Make option to try with the feed url if not then fetch url try

	const setRssLink = async (url, feedUrl) => {
		if (userFeedUrl in state.feedDataStore) {
			//show user that this link already exist
			setUserFeedUrl('');
		} else {
			//first fetch the feed link from the freedly api
			feedUrl = feedUrl.slice(5);
			let sfeedUrl = feedUrl;
			//check this regular expression
			sfeedUrl = sfeedUrl.replace(/^http:\/\//i, 'https://');
			let userUrl = null;
			let userFeed = null;
			if (sfeedUrl === feedUrl) {
				try {
					let data = await fetchFeed(sfeedUrl);
					userUrl = sfeedUrl;
					userFeed = data;
				} catch (err) {
					try {
						userUrl = await getRssLinkFromWebsite(url);
						userFeed = fetchFeed(userUrl);
					} catch {
						userUrl = '';
						userFeed = null;
					}
				}
			} else {
				try {
					let data = await fetchFeed(sfeedUrl);
					userUrl = sfeedUrl;
					userFeed = data;
				} catch (err) {
					try {
						let data = await fetchFeed(feedUrl);
						userUrl = feedUrl;
						userFeed = data;
					} catch (err) {
						try {
							userUrl = await getRssLinkFromWebsite(url);
							userFeed = fetchFeed(userUrl);
						} catch {
							userUrl = '';
							userFeed = null;
						}
					}
				}
			}
			setUserFeedUrl(userUrl);
			setUserFeed(userFeed);
		}
	};

	///handle search click result rss feature  handle
	const handleSearchResultClick = (url, feedUrl) => {
		//processing flag
		//Allow multiple feed add facility
		setRssLink(url, feedUrl);
	};

	const searchResults = searchQueryResult.map((item) => (
		<Card onClick={() => handleSearchResultClick(item.website, item.feedId)}>
			<Image src={item.visualUrl} wrapped ui={false} />
			<Card.Content>{item.title}</Card.Content>
			<Card.Content>{item.topics}</Card.Content>
		</Card>
	));

	const handleSearchClick = async () => {
		let data = await keywordSearch(userFeedUrl);
		if (data) {
			setSearchQueryResults(data.results);
		}
		//show items of feed into a semantic ui react card form
		//first try the feed item link
		// error handle and then try to search from the website
		//On Card click to these
		//getRssLink(data.results[0].website);
	};
	// hanlde adding of space to it (add %20 to it)

	const collectionOptions = Object.keys(state.collections).map((value) => ({
		key: value,
		value: value,
		text: value
	}));

	return (
		<div>
			<div>Keyword or RSS URL for subscription</div>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					placeholder="Add URL"
					name="Add URL"
					value={userFeedUrl}
					onChange={handleUrlChange}
				/>
				<Form.Button
					attached="bottom"
					onClick={handleSearchClick}
					content="Search/Add"
				></Form.Button>
				<Card.Group itemsPerRow={3}>{searchResults}</Card.Group>

				<div>Select the Collection to add the feed to</div>
				<Form.Dropdown
					placeholder="Collection Name"
					fluid
					multiple
					search
					selection
					options={collectionOptions}
					value={userSelectedCollections || []}
					onChange={handleSelectedCollectionChange}
				/>
				<Form.Button
					attached="bottom"
					onClick={() => setAddCollectionsToggle(true)}
					content="Add Collection"
				/>
				{addCollectionsToggle && (
					<Form.Input
						placeholder="Add Collection"
						name="Add Collection"
						value={userMadeCollection}
						onChange={handleCollectionChange}
					/>
				)}
				<Form.Button content="Submit" />
			</Form>
		</div>
	);
}

/*
Validate rss feed feature work with the node environment i.e. in the (electron shell )



Key word searching error fix in the file
Currently wrong architecture for the keyword searching
throw statements check in the state
*/

///on clicking enter it adds url isted of searchcing that has to be fixed after ui update

//allow multiple selection on the basis of the keyword search
// currently done of one selection of the keyword here

//thought on if we have to show the card ui for the url or not
