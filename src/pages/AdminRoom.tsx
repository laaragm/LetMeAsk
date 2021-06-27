import logoImage from '../assets/images/logo.svg';
import deleteImage from '../assets/images/delete.svg';
import '../styles/room.scss';
import '../styles/question.scss';

import { useHistory, useParams } from 'react-router-dom';

import { CustomButton } from '../components/CustomButton';
import { RoomCode } from '../components/RoomCode';

import { useAuth } from '../hooks/useAuth';

import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParameters = {
	id: string;
}

export function AdminRoom() {
	const { user } = useAuth();
	const history = useHistory();
	const parameters = useParams<RoomParameters>();
	const roomId = parameters.id;
	
	const { questions, title } = useRoom(roomId);

	async function handleDeleteQuestion(questionId: string) {
		if (window.confirm('Are you sure you want to delete this question?')) {
			await deleteQuestion(questionId);
		}
	}

	async function deleteQuestion(questionId: string) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
	}

	async function handleEndRoom() {
		await database.ref(`rooms/${roomId}`).update({
			end: new Date(),
		});

		redirectToHome();
	}

	function redirectToHome() {
		history.push('/');
	}

	return(
		<div id="page-room">
			<header> 
				<div className="content">
					<img src={ logoImage } alt="Letmeask" />
					<div> 
						<RoomCode code={ roomId } />
						<CustomButton
							title="End session" 
							cssClass="end-session-button"
							onClick={ handleEndRoom }
						/>
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
							>
								<button
									type="button"
									onClick={ () => handleDeleteQuestion(question.id) }
								>
									<img src={ deleteImage } alt="Delete question" />
								</button>
							</Question>
						)
					}) }
				</div>
			</main>
		</div>
	);
}