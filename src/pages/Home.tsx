import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImage from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

import { useHistory } from 'react-router-dom';

import { CustomButton } from '../components/CustomButton';

import { useAuth } from '../hooks/useAuth';
import { TextField } from '@material-ui/core';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();
	const [ roomCode, setRoomCode ] = useState('');

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}

		navigateToNewRoom(history);
	}

	function navigateToNewRoom(history: any) {
		history.push('/rooms/new');
	}

	async function handleJoinRoom(event: FormEvent) {
		event.preventDefault();

		if (roomCode.trim() === '') {
			return;
		}

		const roomReference = await database.ref(`rooms/${roomCode}`).get();
		if (!roomReference.exists()) {
			alert('Room does not exist.');
			return;
		}

        if (roomReference.val().end) {
            alert('Room has been already closed.');
            return;
        }

		navigateToRoom(history);
	}

	function navigateToRoom(history: any) {
		history.push(`/rooms/${roomCode}`);
	}

	return(
		<div id="page-auth">
			<aside>
				<img src={ illustrationImage } alt="Questions and answers image" />
				<strong> Create live Q&amp;A sessions </strong>
				<p>Let your audience ask you questions in real time. Collect questions and let people send and upvote the ones they wanna hear.</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={ logoImage } alt="LetMeAsk logo" />
					<CustomButton 
						title="Create session with Google" 
						cssClass="create-room" 
						onClick={ handleCreateRoom }
					>
						<img className="google-image" src={ googleIconImage } alt="Google logo" />
					</CustomButton>
					<div className="separator">
						Or join an existing session
					</div>
					<form>
						<TextField
							placeholder="Type the session's code"
							variant="outlined"
							className="session-code"
							onChange={ event => setRoomCode(event.target.value) }
							name={ roomCode }
						/>
						<CustomButton
							title="Join session"
							cssClass="session-button"
							onClick={ handleJoinRoom }
						/>						
					</form>
				</div>
			</main>
		</div>
	);
}