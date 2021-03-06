import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const auth = firebaseApp.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
	return auth
		.signInWithPopup(googleProvider)
		.then((res) => {
			console.log(res.user.uid);
			return res.user.uid;
		})
		.catch((error) => {
			console.log(error.message);
		});
};

export const logOut = () => {
	auth
		.signOut()
		.then(() => {
			console.log('logged out');
		})
		.catch((error) => {
			console.log(error.message);
		});
};
