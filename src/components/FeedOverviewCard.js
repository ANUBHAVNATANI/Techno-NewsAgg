import React from "react";
import { Paper, Grid, Button } from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: `rgb(${"242,242,242"})`,
  },
  img: {
    width: 80,
    height: 80,
    padding: 10,
  },
  gridRow: {
    width: "100%",
  },
}));
const FeedOverviewCard = (props) => {
  const classes = useStyles();

  const colorList = ["red", "blue", "green", "orange"];
  // var item = items[Math.floor(Math.random() * items.length)];

  const randomValue = () => {
    return colorList[Math.floor(Math.random() * colorList.length)];
  };
  const imgUrl =
    "https://mk0droplrg5q83m5xg0r.kinstacdn.com/wp-content/uploads/2020/06/iconfinder_discord_2308078-512x400.png";

  return (
    <Paper
      style={{
        borderRadius: "10px",
        borderTop: "0.5px solid grey",
        borderLeft: "1px solid grey",
        borderRight: "1px solid grey",
        borderBottom: "3px solid " + randomValue(),
      }}
    >
      {/* <Grid container spacing={2}> */}
      <Grid item style={{ margin: 5, textAlign: "right" }}>
        <Button>Subscibe </Button>
      </Grid>
      <Grid item style={{ margin: 5, textAlign: "center" }}>
        <img className={classes.img} alt="complex" src={imgUrl} />
      </Grid>

      <Grid item style={{ fontWeight: "bold", margin: 5, textAlign: "center" }}>
        {props.category}
      </Grid>
      {/* </Grid> */}
    </Paper>
  );
};

export default FeedOverviewCard;
