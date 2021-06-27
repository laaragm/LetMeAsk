import firebase from "firebase";
import { useState } from "react";
import { useEffect } from "react";
import { createContext, ReactNode } from "react";
import { auth } from "../services/firebase";

type User = {
	id: string;
	name: string;
	avatar: string;
}

type AuthContextType = {
	user: User | undefined,
	signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
	children: ReactNode; // ReactNode is what you use when you want to pass components as children props
}

export const AuthContext = createContext({} as AuthContextType); // the argument of createContext is the format of the information you're going to store in the context

export function AuthContextProvider(props: AuthContextProviderProps) {
	const [user, setUser] = useState<User>();

	// Similar to Vue's @Watch
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				manageUser(user);
			}
		})

		return () => {
			unsubscribe();
		}
	})

	async function signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();
		const result = await auth.signInWithPopup(provider);

		if (result.user) {
			manageUser(result.user);
		}
	}

	function manageUser(user: firebase.User) {
		const { displayName, photoURL, uid } = user;
		if (!displayName || !photoURL) {
			throw new Error('Missing information from Google Account.');
		}

		setUser({
			id: uid,
			name: displayName,
			avatar: photoURL
		});
	}
	
	return (
		<AuthContext.Provider value={ {user, signInWithGoogle} }>
			{ props.children }
		</AuthContext.Provider>
	);
}