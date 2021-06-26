import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImage from '../assets/images/google-icon.svg';

import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import '../styles/auth.scss';
import { CustomButton } from '../components/CustomButton';

export function Home() {
	const history = useHistory();

	function navigateToNewRoom() {
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
						onClick={ navigateToNewRoom }
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