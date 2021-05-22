import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../services/firebase';

export const UserContext = createContext({ user: null });

export default (props) => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const { photoURL, displayName, email, uid } = user;
				setUser({
					photoURL,
					displayName,
					email,
					uid
				});
			} else {
				setUser(null);
			}
		});
	}, [auth.currentUser]);
	return (
		<UserContext.Provider value={user}>{props.children}</UserContext.Provider>
	);
};
