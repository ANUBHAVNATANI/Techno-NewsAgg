import React, { useContext, useState, useEffect } from 'react';
import { signInWithGoogle } from '../services/firebase';
import { UserContext } from '../providers/userProvider';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const user = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/dashboard');
		}
	}, [user]);

	return (
		<div>
			<button onClick={signInWithGoogle}>
				<img
					src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
					alt="google icon"
				/>
				<span> Continue with Google</span>
			</button>
		</div>
	);
}
