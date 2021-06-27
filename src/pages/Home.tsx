import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImage from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

import { useHistory } from 'react-router-dom';

import { CustomButton } from '../components/CustomButton';

import { useAuth } from '../hooks/useAuth';

export function Home() {
	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}

		navigateToNewRoom(history);
	}

	function navigateToNewRoom(history: any) {
		history.push('/rooms/new');
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
						<input
							type="text"
							placeholder="Type the session's code"
						/>
						<CustomButton
							title="Join session"
							cssClass="session-button"
						/>						
					</form>
				</div>
			</main>
		</div>
	);
}