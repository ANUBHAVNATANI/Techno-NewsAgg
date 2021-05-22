import feedparser from 'feedparser-promised'
import * as getFeeds from 'get-feeds'
import Mercury from '@postlight/mercury-parser'

const CORS_PROXY = 'https://cors-proxy-rss.herokuapp.com/'

//url validate function
const checkValidURL = (str) => {
	let pattern = new RegExp(
		'^(https?:\\/\\/)?' +
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
			'((\\d{1,3}\\.){3}\\d{1,3}))' +
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
			'(\\?[;&a-z\\d%_.~+=-]*)?' +
			'(\\#[-a-z\\d_]*)?$',
		'i'
	)
	return !!pattern.test(str)
}

//rss fetch function
export const fetchFeed = async (url) => {
	if (checkValidURL(url)) {
		const CORS_URL = CORS_PROXY + url
		try {
			const feed = await feedparser.parse(CORS_URL)
			return Promise.resolve(feed)
		} catch (err) {
			throw 'Unable to fetch rss'
		}
	} else {
		throw 'Wrong URL format'
	}
}

//keyword search function
export const keywordSearch = async (keyword) => {
	if (!checkValidURL(keyword)) {
		let keywordFetchUrl = CORS_PROXY + 'https://cloud.feedly.com/v3/search/feeds?query=' + keyword
		let resp = await fetch(keywordFetchUrl)
		let data = await resp.json()
		return data
	}
}

export const handleSearch = async (value) => {
	if (!checkValidURL(value)) {
		let data = await keywordSearch(value)
	}
}

export const getRssLinkFromWebsite = async (url) => {
	let htmlUrl = CORS_PROXY + url
	let htmlString = await fetch(htmlUrl)
	htmlString = await htmlString.text()
	const feed = getFeeds(htmlString)
	//returning the first url as of now
	// we should give user the choice of what to select
	return feed[0].href
}

export const feedParse = async (url) => {
	let cors_url = CORS_PROXY + url
	let feedInfoData = await Mercury.parse(cors_url)
	return feedInfoData
}
