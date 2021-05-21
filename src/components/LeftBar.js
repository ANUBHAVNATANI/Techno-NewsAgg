import React, { useState, useContext, useEffect } from "react";
import { Segment, Sidebar, Menu, Icon, Grid, Image } from "semantic-ui-react";
import Settings from "../views/Settings";
import FeedView from "../views/FeedView";
import Shop from "../views/Shop";
import Avatar from "react-avatar";
import CollectionsView from "../views/CollectionsView";
import { Context } from "../store/Store";
import { UserContext } from "../providers/userProvider";
import { Redirect } from "react-router-dom";
import { logOut } from "../services/firebase";

export default function LeftBar() {
  const [state, dispatch] = useContext(Context);
  const [activeItem, setActiveItem] = useState("Home");
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  const user = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  useEffect(() => {
    if (!user) {
      setRedirect("/");
    }
  }, [user]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  // const [visible, setVisible] = useState(true);
  const CollectionsAvatarComponent = Object.keys(state.collections).map(
    (item) => (
      <>
        <Menu.Item
          name={item}
          onClick={handleItemClick}
          active={activeItem === item}
          key={item}
        >
          <Avatar name={item} round size="30px" />
        </Menu.Item>
      </>
    )
  );
  const renderCollectionView = Object.keys(state.collections).map((item) => (
    <>{activeItem === item && <CollectionsView collectionName={item} />}</>
  ));

  return (
    // <Sidebar.Pushable as={Segment}>
    <Grid>
      <Grid.Column width={1}>
        {/* <Sidebar
          as={Menu}
          animation="overlay"
          direction="left"
          vertical
          visible
          width="thin"
          icon="labeled"
        > */}
        <Menu pointing secondary vertical icon="labeled" fixed="left">
          <Icon.Group>
            <Icon loading size="big" name="circle notch" />
            <Icon name="user" />
          </Icon.Group>

          <Menu.Item
            name="Home"
            active={activeItem === "Home"}
            onClick={handleItemClick}
          >
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item
            name="Settings"
            active={activeItem === "Settings"}
            onClick={handleItemClick}
          >
            <Icon name="setting" />
            Settings
          </Menu.Item>
          <Menu.Item
            name="Store"
            active={activeItem === "Store"}
            onClick={handleItemClick}
          >
            <Icon name="shopping bag" />
            Store
          </Menu.Item>
          <Menu.Item
            name="Logout"
            active={activeItem == "Logout"}
            onClick={handleItemClick}
          >
            <Icon name="log out" />
            Log out
          </Menu.Item>

          {CollectionsAvatarComponent}
          {/* Decision on weather text should come or not below the icon as it would then makes no sense to use the icons isted add a random avatar or on which if we hover we get the text*/}
          {/* Python */}

          {/* </Sidebar> */}
        </Menu>
      </Grid.Column>
      <Grid.Column width={12}>
        {/* <Sidebar.Pusher> */}
        <Segment basic>
          {activeItem === "Home" && <FeedView />}
          {activeItem === "Settings" && <Settings />}
          {activeItem === "Store" && <Shop />}
          {activeItem === "Logout" && <>{logOut()}</>}
          {renderCollectionView}
        </Segment>
      </Grid.Column>
      {/* </Sidebar.Pusher> */}
      {/* // </Sidebar.Pushable> */}
    </Grid>
  );
}
