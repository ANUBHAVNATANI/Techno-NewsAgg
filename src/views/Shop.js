import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, GridList, GridListTile, Paper } from '@material-ui/core';
import CategoryItem from '../components/CategoryItem';
import FeedOverviewCard from '../components/FeedOverviewCard';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		background: `rgb(${'242,242,242'})`,
		marginLeft: 100
	},
	headItem: {
		width: '100%',
		// height: 5,
		padding: 10
	},
	gridRow: {
		width: '100%'
	},
	featuredImg: {
		width: '100%',
		height: '12vh',
		paddingLeft: 10,
		paddingRight: 10
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	gridCategoryList: {
		height: 100
	},
	gridFeedList: {
		height: 200
	}
}));

export default function Shop() {
	const classes = useStyles();
	let imgUrl = 'https://miro.medium.com/max/3712/0*R91G2G2ruRMkc1zT.png';
	const { featuredImgUrl, setFeaturedImgUrl } = useState(imgUrl);
	const listOfCategories = [
		'BioMechanics',
		'Resarch Papers',
		'Tech News',
		'Covid News',
		'Robotics',
		'Job World'
	];

	return (
		<div className={classes.root}>
			<Grid container spacing={6}>
				<Grid item className={classes.gridRow}>
					<Grid item className={classes.headItem}>
						<h3>Featured Blog</h3>
					</Grid>
					<Grid item>
						<img className={classes.featuredImg} alt="complex" src={imgUrl} />
					</Grid>
				</Grid>
				<Grid item className={classes.gridRow}>
					<Grid item className={classes.headItem}>
						<h3>Categories</h3>
					</Grid>
					<GridList
						cellHeight={10}
						cols={3}
						className={classes.gridCategoryList}
					>
						{listOfCategories.map((element) => (
							<div>
								<GridListTile
									key="Subheader"
									style={{ paddingLeft: 10, paddingRight: 10 }}
								>
									<CategoryItem category={element} />
								</GridListTile>
							</div>
						))}
					</GridList>
				</Grid>
				<Grid item className={classes.gridRow}>
					<Grid item className={classes.headItem}>
						<h3>Categories</h3>
					</Grid>
					<GridList cellHeight={100} cols={6} className={classes.gridFeedList}>
						{listOfCategories.map((element) => (
							<div>
								<GridListTile
									key="Subheader"
									style={{ paddingLeft: 10, paddingRight: 10 }}
								>
									<FeedOverviewCard category={element} />
								</GridListTile>
							</div>
						))}
					</GridList>
				</Grid>
				<Grid item className={classes.gridRow}>
					<Grid item className={classes.headItem}>
						<h3>Subscribed</h3>
					</Grid>
					<GridList cellHeight={100} cols={6} className={classes.gridFeedList}>
						{listOfCategories.map((element) => (
							<div>
								<GridListTile
									key="Subheader"
									style={{ paddingLeft: 10, paddingRight: 10 }}
								>
									<FeedOverviewCard category={element} />
								</GridListTile>
							</div>
						))}
					</GridList>
				</Grid>
			</Grid>
		</div>
	);
}
