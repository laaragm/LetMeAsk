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


type FirebaseQuestions = Record<string, {
	author: {
		name: string;
		avatar: string;
	}
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
}>

type QuestionType = {
	id: string,
	author: {
		name: string;
		avatar: string;
	}
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
}

type RoomParameters = {
	id: string;
}

export function Room() {
	const { user } = useAuth();
	const parameters = useParams<RoomParameters>();
	const [ newQuestion, setNewQuestion ] = useState('');
	const [ questions, setQuestions ] = useState<QuestionType[]>([]);
	const [ title, setTitle ] = useState('');
	const roomId = parameters.id;

	useEffect(() => {
		const roomReference = getRoom();

		// if you want to listen to an event only once you use "once", otherwise you use "on"
		roomReference.on('value', room => {
			const databaseRoom = room.val();
			const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

			const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
				return {
					id: key,
					content: value.content,
					author: value.author,
					isHighlighted: value.isHighlighted,
					isAnswered: value.isAnswered,
				}
			});

			setTitle(databaseRoom.title);
			setQuestions(parsedQuestions);
		})
	}, [roomId]);

	function getRoom() {
		return database.ref(`rooms/${roomId}`);
	}

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
					<RoomCode code={ roomId } />
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1> Room { title } </h1>
					{ questions.length > 0 && <span> { questions.length } question(s) </span> }
				</div>

				<form>
					<TextareaAutosize
						className="question-field"
						rows={1}
						rowsMax={Infinity}
						placeholder="What do you want to ask?"
						onChange={ event => setNewQuestion(event.target.value) }
						name={ newQuestion }
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
						/>
					</div>
				</form>
				
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