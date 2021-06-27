import { BrowserRouter, Route } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';

import { auth, firebase } from './services/firebase';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { CustomButton } from './components/CustomButton';
import { AuthContextProvider } from './contexts/AuthContext';

// type User = {
// 	id: string;
// 	name: string;
// 	avatar: string;
// }

// type AuthContextType = {
// 	user: User | undefined,
// 	signInWithGoogle: () => Promise<void>;
// }

// export const AuthContext = createContext({} as AuthContextType); // the argument of createContext is the format of the information you're going to store in the context

function App() {
	// const [user, setUser] = useState<User>();

	// // Similar to Vue's @Watch
	// useEffect(() => {
	// 	const unsubscribe = auth.onAuthStateChanged(user => {
	// 		if (user) {
	// 			manageUser(user);
	// 		}
	// 	})

	// 	return () => {
	// 		unsubscribe();
	// 	}
	// })

	// async function signInWithGoogle() {
	// 	const provider = new firebase.auth.GoogleAuthProvider();
	// 	const result = await auth.signInWithPopup(provider);

	// 	if (result.user) {
	// 		manageUser(result.user);
	// 	}
	// }

	// function manageUser(user: firebase.User) {
	// 	const { displayName, photoURL, uid } = user;
	// 	if (!displayName || !photoURL) {
	// 		throw new Error('Missing information from Google Account.');
	// 	}

	// 	setUser({
	// 		id: uid,
	// 		name: displayName,
	// 		avatar: photoURL
	// 	});
	// }

	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Route path="/" exact component={ Home } />
				<Route path="/rooms/new" component={ NewRoom } />
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
