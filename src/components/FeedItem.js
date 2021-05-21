import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Image,
  Card,
  Label,
  Modal,
  Reveal,
  Dimmer,
  Segment
} from "semantic-ui-react";
import { feedParse } from "../modules/feedparser";
import "./modalStyle.css";
import Iframe from "react-iframe";

export default function FeedItem(props) {
  const [open, setOpen] = useState(false);
  const [feedInfo, setFeedInfo] = useState({});
  const [contentToggle, setContentToggle] = useState(true);
  const [defaultHtmlRender, setDefaultHtmlRender] = useState(false);
  //const [dimActive, setDimActive] = useState(false);
  useEffect(() => {
    feedParse(props.feedData.link).then((data) => setFeedInfo(data));
    const htmlRegx = /<(.|\n)*?>/;
    if (htmlRegx.test(props.feedData.description)) {
      setDefaultHtmlRender(true);
    }
  }, []);
  const checkSummaryContent = (summary) => {
    const htmlRegx = /<(.|\n)*?>/;
    if (summary == undefined) return false;
    else if (htmlRegx.test(summary)) return false;
    else return true;
  };
  const insertContent = () => {
    //if (contentToggle) {
    setTimeout(function () {
      if (defaultHtmlRender) {
        document.getElementById("modalContent").innerHTML =
          props.feedData.description;
      } else {
        document.getElementById("modalContent").innerHTML = feedInfo.content;
      }
    }, 1);
    //}
  };
  const handleContentClick = () => {
    setOpen(true);
    insertContent();
  };
  //give user the option to select between different parsed content
  const parsedContentToggle = () => {
    if (!contentToggle) {
      setContentToggle(true);
      insertContent();
    }
  };
  //company name whose rss feed it is define
  //can define extra on the card to add icon and other things
  const rssOwener = "GitHub";
  const summarycontent = (
    <div>
      {checkSummaryContent(props.feedData.summary)
        ? props.feedData.summary
        : feedInfo.excerpt}
    </div>
  );

  return (
    <>
      {/* <Dimmer.Dimmable
        as={Card}
        dimmed={dimActive}
        onMouseEnter={() => setDimActive(true)}
        onMouseLeave={() => setDimActive(false)}
        raised
        fluid
        image={feedInfo.lead_image_url}
        header={feedInfo.title}
        meta={rssOwener}
        onClick={handleContentClick}
        dimmer={{ dimActive, summarycontent }}
      > */}
      {/* <Dimmer active={dimactive}>
          <div>
            {checkSummaryContent(props.feedData.summary)
              ? props.feedData.summary
              : feedInfo.excerpt}
          </div>
        </Dimmer> */}
      {/* </Dimmer.Dimmable> */}
      <Reveal animated="move up">
        <Reveal.Content visible>
          <Card
            raised
            fluid
            image={feedInfo.lead_image_url}
            header={feedInfo.title}
            meta={rssOwener}
            onClick={handleContentClick}
            style={{ margin: "auto", padding: "5px" }}
          />
        </Reveal.Content>
        <Reveal.Content hidden>
          {/* <Card fluid onClick={handleContentClick}>
            <Card.Content
              description={
                checkSummaryContent(props.feedData.summary)
                  ? props.feedData.summary
                  : feedInfo.excerpt
              }
            ></Card.Content>
          </Card> */}
          <Segment onClick={handleContentClick}>
            {checkSummaryContent(props.feedData.summary)
              ? props.feedData.summary
              : feedInfo.excerpt}
          </Segment>
        </Reveal.Content>
      </Reveal>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        size="large"
      >
        <Modal.Header>{feedInfo.title}</Modal.Header>
        <Modal.Content image scrolling>
          {contentToggle === true && <div id="modalContent"></div>}
          {contentToggle === false && (
            <Iframe
              url={props.feedData.link}
              width="100%"
              height="490px"
              scrolling="none"
              styles={{ position: "absolute", border: "none" }}
            />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => parsedContentToggle()} primary>
            Parsed Content <Icon name="chevron right" />
          </Button>
          <Button onClick={() => setContentToggle(false)} primary>
            Web Content <Icon name="chevron right" />
          </Button>
          <Button onClick={() => setOpen(false)} primary>
            Close <Icon name="chevron right" />
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

///To do
//1. Insted of mychoice in modal provide two options if possible as
// there can be distortion in the first one
// if not possible then show ours only

// or show as invalid rss
//or can use that rss2json api for those at least

///2. Find a way to refuced to connect in iframe options

//same url second addition not working(check and test this condition)

//insertContnet find the reason why such condition works in this case

///features
/// pin the channel or not option
/// add to collections option
///serch in the all feeds
///auth menu settings
///modal of settings at the end
///of the top left bar
/// card like layout for the rss

///summary there is &helip at the end we have to fix that (most probably in the feedParse summary)

//Bugs ---
//Empty entry bug fix if there is an empty entry then ui fails and shows nothing
//Names on the avatar bubles
