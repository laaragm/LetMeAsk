import logoImage from '../assets/images/logo.svg';
import '../styles/room.scss';
import '../styles/question.scss';

import { useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { TextareaAutosize, TextField } from '@material-ui/core';

import { CustomButton } from '../components/CustomButton';
import { RoomCode } from '../components/RoomCode';

import { useAuth } from '../hooks/useAuth';

import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';

type RoomParameters = {
	id: string;
}

export function AdminRoom() {
	const { user } = useAuth();
	const parameters = useParams<RoomParameters>();
	const [ newQuestion, setNewQuestion ] = useState('');
	const roomId = parameters.id;
	
	const { questions, title } = useRoom(roomId);

	async function handleSendQuestion(event: FormEvent) {
		event.preventDefault();

		if (newQuestion.trim() === '') {
			return;
		}

		if (!user) {
			throw new Error('You must be logged in to send a question.');
		}

		const question = build();

		await createQuestion(question);

		eraseQuestion();
	}

	function build() {
		const question = {
			content: newQuestion,
			author: {
				name: user?.name,
				avatar: user?.avatar,
			},
			isHighlighted: false,
			isAnswered: false,
		};

		return question;
	}

	async function createQuestion(question: {}) {
		await database.ref(`rooms/${roomId}/questions`).push(question);
	}

	function eraseQuestion() {
		setNewQuestion('');
	}

	return(
		<div id="page-room">
			<header> 
				<div className="content">
					<img src={ logoImage } alt="Letmeask" />
					<div> 
						<RoomCode code={ roomId } />
						<CustomButton title="End session" cssClass="end-session-button" />
					</div>
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1> Room { title } </h1>
					{ questions.length > 0 && <span> { questions.length } question(s) </span> }
				</div>

				<div className="question-list">
					{ questions.map(question => {
						return (
							<Question
								key={ question.id }
								content={ question.content }
								author={ question.author }
							/>
						)
					}) }
				</div>
			</main>
		</div>
	);
}