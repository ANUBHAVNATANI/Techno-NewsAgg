import React, { useContext, useState } from 'react';
import { Context } from '../store/Store';
import feedparser from 'feedparser-promised';
import { Dropdown, Input, Form, Card, Image } from 'semantic-ui-react';
import * as getFeeds from 'get-feeds';
import {
	fetchFeed,
	getRssLinkFromWebsite,
	keywordSearch
} from '../modules/feedparser';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '80%',
		'& > * + *': {
			marginTop: theme.spacing(3)
		}
	},

	btn: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center'
	},
	paper: {
		display: 'flex',
		justifyContent: 'space-between'
	}
}));

const CORS_PROXY = 'https://cors-proxy-rss.herokuapp.com/';
export default function FeedForm() {
	const classes = useStyles();

	const [state, dispatch] = useContext(Context);
	const [userFeedUrl, setUserFeedUrl] = useState('');
	const [addCollectionsToggle, setAddCollectionsToggle] = useState(false);
	const [userMadeCollection, setUserMadeCollection] = useState('');
	const [userSelectedCollections, setUserSelectedCollections] = useState([]);
	const [searchQueryResult, setSearchQueryResults] = useState([]);
	const handleUrlChange = (e, value) => {
		console.log(value);
		// setUserFeedUrl(value);
	};
	const handleCollectionChange = (e, { value }) => {
		setUserMadeCollection(value);
	};
	const handleSelectedCollectionChange = (e, { value }) => {
		setUserSelectedCollections(value);
	};
	const storeFeed = async (value) => {
		if (value in state.feedDataStore) {
			console.log('Already exist');
		} else {
			await dispatch({
				type: 'ADD_FEED_SOURCE',
				payload: value
			});
		}
		// try {
		//   const feed = await fetchFeed(value);
		//   dispatch({ type: "ADD_FEED_DATA", payload: [value, feed] });
		//   dispatch({ type: "ADD_TO_FEED_LIST", payload: feed });
		// } catch (err) {
		//   throw err;
		// }
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
		storeFeed(userFeedUrl);
		handleAddCollectionSubmit();
		setUserMadeCollection('');
		setUserFeedUrl('');
		setUserSelectedCollections('');
		setAddCollectionsToggle(false);
	};
	///some sought of feedback to user that it is done (ui-feat)

	///key word search feature for the user

	//search click for the keyword or site
	//whitespace case handle (2 word in company name or other source or else extra white space in front and back)

	///Extract the rss links form the given page

	/// Make option to try with the feed url if not then fetch url try

	const setRssLink = async (url, feedUrl) => {
		//first fetch the feed link from the freedly api
		feedUrl = feedUrl.slice(5);
		let sfeedUrl = feedUrl;
		//check this regular expression
		sfeedUrl = sfeedUrl.replace(/^http:\/\//i, 'https://');
		let userUrl = null;
		if (sfeedUrl === feedUrl) {
			try {
				userUrl = await fetchFeed(sfeedUrl);
			} catch (err) {
				userUrl = await getRssLinkFromWebsite(url);
			}
		} else {
			try {
				userUrl = await fetchFeed(sfeedUrl);
			} catch (err) {
				try {
					userUrl = await fetchFeed(feedUrl);
				} catch (err) {
					userUrl = await getRssLinkFromWebsite(url);
				}
			}
		}
		setUserFeedUrl(userUrl);
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
		<div className={classes.root}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<TextField
					size="small"
					id="outlined-basic"
					label="Search Keyword"
					variant="outlined"
					style={{ marginRight: '10px', width: '30%' }}
				/>

				<Button variant="outlined" color="primary" size="large">
					Search
				</Button>
			</div>
			<div className={classes.btn}>
				<Button onClick={handleSearchClick}>Search/Add</Button>
			</div>
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
			<div>
				<Button onClick={() => setAddCollectionsToggle(true)}>
					Add Collection
				</Button>
			</div>

			{addCollectionsToggle && (
				<Form.Input
					placeholder="Add Collection"
					name="Add Collection"
					value={userMadeCollection}
					onChange={handleCollectionChange}
				/>
			)}
			<div>
				<Button content="Submit" onClick={handleSubmit} />
			</div>
			{/* </Form> */}
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
