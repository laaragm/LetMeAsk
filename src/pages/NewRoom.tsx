import { useHistory, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';

import { useContext } from 'react';

import { CustomButton } from "../components/CustomButton";

import '../styles/auth.scss';
import { AuthContext } from '../App';

export function NewRoom() {
	const { user } = useContext(AuthContext);

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
					<h1>{ user?.name }</h1>
					<h2> Create new session </h2>
					<form>
						<input
							type="text"
							placeholder="Session name"
						/>
						<CustomButton
							title="Create session"
							cssClass="session-button"
						/>
					</form>
					<p> 
						Want to join an existing session? <Link to="/">Click here</Link>
					</p>			
				</div>
			</main>
		</div>
	);
}