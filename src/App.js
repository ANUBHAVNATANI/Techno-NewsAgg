import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FeedView from "./views/FeedView";
//import FetchRss from "./components/FetchRss";
import FeedForm from "./components/FeedForm";
import Settings from "./views/Settings";
//import FetchRss1 from "./components/FetchRss1";
import Store from "./store/Store";
import LeftBar from "./components/LeftBar";
import UserProvider from "./providers/userProvider";
import Login from "./components/Login";
//import Test from "./components/Test";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/home">
              <Store>
                <LeftBar />
              </Store>
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;

/// features to develop
/*
1. All feed view (Done)
Multiple feed view list render
2. Store feed as a user info
3. Make collections as a user/or individual source (Done)///////
4. Store schema
5. Sharable collections 
6. Left bar ui (Done)
7. Settings page/modal (Done)
8. Github authentication
9. Store login feature
10. Graph ql integration
11. Authentication (Done)
12. Collections public and private features
13. Article read/unread and favorite feauter
14. Article save feature
15. Groups can be subscribed (Done)///////
17. Option of pinning the collection or single/ other wise it is by default yes for collections and no for single (Doing)//////
18. All modal view incorporate or new pages using router try (Done)
19. Limit on fetching the feed (In progress) 
20. Search feature
21. Sort all feed item by date (Done)
Proposed solution merge the datastore and arrange them according to the date param
Use binary serach to search the insert position and then intert accordingly
22. Validate The URL first (Done)
23. Rss find url(Done)
24. Dynamic Icon generation (Doing)///////////
*/
