import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import '../styles/auth.scss';

import { useHistory, Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import { CustomButton } from '../components/CustomButton';
import { TextField } from '@material-ui/core';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function NewRoom() {
	const { user } = useAuth();
	const history = useHistory();
	const [ newRoom, setNewRoom ] = useState('');

	async function handleCreateRoom(event: FormEvent) {
		event.preventDefault();

		if (newRoom.trim() === '') {
			return;
		}

		const roomReference = database.ref('rooms');
		const firebaseRoom = await addNewRoom(roomReference);

		navigateToRoom(history, firebaseRoom.key);
	}

	async function addNewRoom(roomReference: any) {
		const firebaseRoom = await roomReference.push({
			title: newRoom,
			authorId: user?.id,

		});
		
		return firebaseRoom;
	}

	function navigateToRoom(history: any, id: string) {
		history.push(`/rooms/${id}`);
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
					<h2> Create new session </h2>
					<div>
						<TextField
							placeholder="Session name"
							variant="outlined"
							className="session-name"
							onChange={ event => setNewRoom(event.target.value) }
							name={ newRoom }
						/>
						<CustomButton
							title="Create session"
							cssClass="session-button"
							onClick={ handleCreateRoom }
						/>
					</div>
					<p> 
						Want to join an existing session? <Link to="/">Click here</Link>
					</p>			
				</div>
			</main>
		</div>
	);
}