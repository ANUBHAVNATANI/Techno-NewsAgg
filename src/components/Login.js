import React, { useContext, useState, useEffect } from 'react'
import { signInWithGoogle } from '../services/firebase'
import { UserContext } from '../providers/userProvider'
import { Redirect, useHistory } from 'react-router-dom'

export default function Login() {
	const user = useContext(UserContext)
	const history = useHistory()

	useEffect(() => {
		if (user) {
			history.push('/dashboard')
		}
	}, [user])

	return (
		<div>
			<button onClick={signInWithGoogle}>
				<img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
				<span> Continue with Google</span>
			</button>
		</div>
	)
}
