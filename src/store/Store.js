import React, { createContext, useReducer } from "react";
import Reducer from "../reducer/Reducer";

//local storage store the data that use clicks on the save button
const initialState = {
  feedSourceCount: 0,
  feedSourceUrlList: [],
  feedDataStore: {},
  allFeedList: [],
  collections: {}
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
