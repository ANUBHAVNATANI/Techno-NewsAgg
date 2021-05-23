import React, { useRef, useContext, useState } from 'react';
import { Context } from '../store/Store';
import feedparser from 'feedparser-promised';
import { Dropdown, Input, Form, Card, Image } from 'semantic-ui-react';
import * as getFeeds from 'get-feeds';
import {
	fetchFeed,
	getRssLinkFromWebsite,
	keywordSearch,
	checkValidURL
} from '../modules/feedparser';
import { makeStyles } from '@material-ui/core/styles';
import {
	TextField,
	Button,
	ListItemSecondaryAction,
	List,
	ListItemAvatar,
	ListItemText,
	Paper,
	Avatar,
	Grid,
	ListItem,
	Divider
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
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
	const [selectedSources, setSelectedSources] = useState([]);
	const selectedSourcesSet = useRef(new Set());

	const [state, dispatch] = useContext(Context);
	const [userFeedUrl, setUserFeedUrl] = useState('');
	const [userFeed, setUserFeed] = useState(null);
	const [addCollectionsToggle, setAddCollectionsToggle] = useState(false);
	const [userMadeCollection, setUserMadeCollection] = useState('');
	const [userSelectedCollections, setUserSelectedCollections] = useState([]);
	const [searchQueryResult, setSearchQueryResults] = useState([]);
	const handleUrlChange = (e) => {
		setUserFeedUrl(e.target.value);
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
		<Card
			onClick={() => {
				// console.log(selectedSourcesSet);
				if (!selectedSourcesSet.current.has(item.website)) {
					// console.log(item.website);

					handleSearchResultClick(item.website, item.feedId);
					setSelectedSources([...selectedSources, item.website]);
				}
				selectedSourcesSet.current.add(item.website);
			}}
		>
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
		<div className={classes.root}>
			<Grid container style={{ flexGrow: 1 }} spacing={6}>
				<Grid item md={6} style={{ borderRight: '1px solid gray' }}>
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
							onChange={handleUrlChange}
							style={{ marginRight: '10px', width: '60%' }}
						/>

						<Button
							variant="outlined"
							color="primary"
							onClick={handleSearchClick}
							size="large"
						>
							Search
						</Button>
					</div>

					<Card.Group style={{ marginTop: '10px' }} itemsPerRow={3}>
						{searchResults}
					</Card.Group>
				</Grid>
				<Grid
					item
					md={6}
					style={{
						display: 'flex',
						justifyContent: 'center'
						// alignItems: 'center'
					}}
				>
					<Paper
						style={{
							width: '400px',
							height: 'wrap',
							maxHeight: '700px',
							overflow: 'auto'
						}}
					>
						<div
							style={{
								padding: 5,
								display: 'flex',
								justifyContent: 'center'
							}}
						>
							<h3>Selected Sources</h3>
						</div>
						<Divider />
						{selectedSources.length === 0 ? (
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									padding: 10
								}}
							>
								No sources selected
							</div>
						) : (
							<List>
								{selectedSources.map((source) => (
									<ListItem>
										<ListItemAvatar>
											<Avatar>
												<LinkIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText style={{ width: '50px' }} primary={source} />
										<ListItemSecondaryAction>
											<IconButton edge="end" aria-label="delete">
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								))}
							</List>
						)}
					</Paper>
				</Grid>
			</Grid>

			<div>Select the Collection to add the feed to</div>
			<Form.Dropdown
				placeholder="Collection Name"
				fluid
				multiple
				search
				selection
				options={collectionOptions}
				value={userSelectedCollections}
				onChange={handleSelectedCollectionChange}
			/>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Button
					color="primary"
					variant="outlined"
					onClick={() => setAddCollectionsToggle(true)}
				>
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
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Button
					color="primary"
					variant="outlined"
					content="Submit"
					onClick={handleSubmit}
				>
					Sumbit
				</Button>
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
