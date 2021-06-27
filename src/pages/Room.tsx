import logoImage from '../assets/images/logo.svg';
import '../styles/room.scss';

import { useParams } from 'react-router-dom';

import { CustomButton } from '../components/CustomButton';
import { RoomCode } from '../components/RoomCode';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type RoomParameters = {
	id: string;
}

export function Room() {
	const { user } = useAuth();
	const parameters = useParams<RoomParameters>();
	const [ newQuestion, setNewQuestion ] = useState('');
	const roomId = parameters.id;

	async function handleSendQuestion(event: FormEvent) {
		event.preventDefault();

		if (newQuestion.trim() === '') {
			return;
		}

		if (!user) {
			throw new Error('You must be logged in to send a question.');
		}

		const question = {
			content: newQuestion.trim,
			author: {
				name: user?.name,
				avatar: user?.avatar,
			},
			isHighlighted: false,
			isAnswered: false,
		}

		await createQuestion();

		eraseQuestion();
	}

	async function createQuestion() {
		await database.ref(`rooms/${roomId}/questions`).push();
	}

	function eraseQuestion() {
		setNewQuestion('');
	}

	return(
		<div id="page-room">
			<header> 
				<div className="content">
					<img src={ logoImage } alt="Letmeask" />
					<RoomCode code={ roomId } />
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1> Sala React </h1>
					<span> 4 perguntas </span>
				</div>

				<form>
					<textarea
						placeholder="What do you want to ask?"
						onChange={ event => setNewQuestion(event.target.value) }
						value={ newQuestion }
					/>

					<div className="form-footer">
						{ user ? (
							<div className="user-info"> 
								<img src={ user.avatar } alt={ user.name } />
								<span> { user.name } </span>
							</div>
						) : (
							<span> 
								In order to ask a question, please <button> login </button>.
							</span>
						) }
						<CustomButton 
							title="Send question"
							cssClass="send-question-button"
							onClick={ handleSendQuestion }
							isDisabled={ !user }
						>
							
						</CustomButton>
					</div>
				</form>
			</main>
		</div>
	);
}