import { db } from '../firebase';

const initialUser = {
	name: '',
	collections: [],
	favourites: [],
	sources: []
	// sources : array of url (string)
};

// collections
// {
//   name: "collection_name",
//   id: ''
// }

// user
// on authentication
export const getUser = async (uid) => {
	const docRef = db.collection('users').doc(uid);
	try {
		const userData = await docRef.get();
		if (userData.exists) {
			return { ...userData.data(), id: uid };
		} else {
			const newUser = await updateUser({ id: uid, ...initialUser });
			return newUser;
		}
	} catch (e) {
		return e;
	}
};

// to update collections, sources, createNewUser
export const updateUser = async (userData) => {
	const { id, ...restUserData } = userData;
	const colRef = db.collection('users');
	try {
		// updating existing user
		// if (id) {
		const updatedUser = await colRef.doc(id).set(restUserData, { merge: true });
		if (updateUser) {
			return userData;
		} else {
			return {};
		}
		// }
		// // create new user
		// else {
		// 	const newUser = await colRef.add(restUserData);
		// 	if (newUser) {
		// 		return { ...restUserData, id: newUser.id };
		// 	} else {
		// 		return {};
		// 	}
		// }
	} catch (e) {
		return e;
	}
};

// collections
export const getCollection = async (collectionId) => {
	const docRef = db.collection('collections').doc(collectionId);
	try {
		const collectionData = await docRef.get();
		if (collectionData.exists) {
			return { ...collectionData.data(), id: collectionId };
		} else {
			return {};
		}
	} catch (e) {
		return e;
	}
};

export const getVerifiedCollections = async () => {
	const docRef = db.collection('collections').where('is_verified', '==', true);
	try {
		const querySnapshot = await docRef.get();
		let collections = [];
		querySnapshot.forEach((collection) => {
			collections.push({ id: collection.id, ...collection.data() });
		});
		return collections;
	} catch (e) {
		return e;
	}
};

export const createCollection = async (collectionData) => {
	const colRef = db.collection('collections');
	try {
		// create new collection
		const newCollection = await colRef.add(collectionData);
		if (newCollection) {
			return { ...collectionData, id: newCollection.id };
		} else {
			return {};
		}
	} catch (e) {
		return e;
	}
};

// sources
export const getSource = async (sourceId) => {
	const docRef = db.collection('sources').doc(sourceId);
	try {
		const sourceData = await docRef.get();
		if (sourceData.exists) {
			return { ...sourceData.data(), id: sourceId };
		} else {
			return {};
		}
	} catch (e) {
		return e;
	}
};

export const createSource = async (sourceData) => {
	const colRef = db.collection('sources');
	try {
		// create new source
		const newSource = await colRef.add(sourceData);
		if (newSource) {
			return { ...sourceData, id: newSource.id };
		} else {
			return {};
		}
	} catch (e) {
		return e;
	}
};
