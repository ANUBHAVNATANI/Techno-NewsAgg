import React from "react";
import { Paper, Grid } from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";

const CategoryItem = (props) => {
  const colorList = ["red", "blue", "green", "orange"];
  // var item = items[Math.floor(Math.random() * items.length)];

  const randomValue = () => {
    return colorList[Math.floor(Math.random() * colorList.length)];
  };

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
      <Grid container spacing={2}>
        <Grid item style={{ margin: 5 }}>
          <CategoryIcon />
        </Grid>

        <Grid item style={{ fontWeight: "bold", margin: 5 }}>
          {props.category}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CategoryItem;
