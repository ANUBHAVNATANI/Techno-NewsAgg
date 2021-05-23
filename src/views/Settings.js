import React, { useState } from 'react';
import { Menu, Container, Grid } from 'semantic-ui-react';
import FeedForm from '../components/FeedForm';

export default function Settings() {
	const [activeItem, setActiveItem] = useState('Add Source');
	const handleItemClick = (e, { name }) => {
		setActiveItem(name);
	};
	return (
		<div style={{ marginLeft: '100px' }}>
			<Grid>
				<Grid.Column width={3}>
					<Menu secondary vertical>
						<Menu.Item
							name="Account Info"
							active={activeItem === 'Account Info'}
							onClick={handleItemClick}
						/>
						<Menu.Item
							name="Add Source"
							active={activeItem === 'Add Source'}
							onClick={handleItemClick}
						/>
						<Menu.Item
							name="Preferences"
							active={activeItem === 'Preferences'}
							onClick={handleItemClick}
						/>
					</Menu>
				</Grid.Column>
				<Grid.Column stretched width={12}>
					<Container fluid>
						{activeItem === 'Account Info' && <p>You Account </p>}
						{activeItem === 'Add Source' && <FeedForm />}
						{activeItem === 'Preferences' && <p> You selected pref</p>}
					</Container>
				</Grid.Column>
			</Grid>
		</div>
	);
}
