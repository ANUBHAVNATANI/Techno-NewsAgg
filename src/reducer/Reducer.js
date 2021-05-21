const Reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FEED_SOURCE":
      return {
        ...state,
        feedSourceCount: state.feedSourceCount + 1,
        feedSourceUrlList: [...state.feedSourceUrlList, action.payload]
        // feedDataStore: {
        //   ...state.feedDataStore,
        //   [action.payload[0]]: action.payload[1]
        //}
      };
    case "ADD_FEED_DATA":
      return {
        ...state,
        feedDataStore: {
          ...state.feedDataStore,
          [action.payload[0]]: action.payload[1]
        }
      };
    case "ADD_TO_FEED_LIST": {
      let currFeedList = state.allFeedList;
      currFeedList = [...currFeedList, ...action.payload];
      currFeedList.sort((a, b) => b.date - a.date);
      return {
        ...state,
        allFeedList: currFeedList
      };
    }
    case "ADD_TO_COLLECTIONS": {
      let tempCollections = {};
      for (let i = 0; i < action.payload[0].length; i++) {
        let collectionsFeedList = [];
        if (action.payload[0][i] in state.collections) {
          collectionsFeedList = [
            ...state.collections[action.payload[0][i]],
            action.payload[1]
          ];
        } else {
          collectionsFeedList.push(action.payload[1]);
        }
        tempCollections[action.payload[0][i]] = collectionsFeedList;
      }
      return {
        ...state,
        collections: { ...state.collections, ...tempCollections }
      };
    }
  }
};
export default Reducer;
