import { useHistory, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';

import { useContext } from 'react';

import { TestContext } from '../App';

import { CustomButton } from "../components/CustomButton";

import '../styles/auth.scss';

export function NewRoom() {
	const { value, setValue } = useContext(TestContext); 

	return(
		<div id="page-auth">
			<aside>
				<img src={ illustrationImage } alt="Questions and answers image" />
				<strong> Create live Q&amp;A sessions </strong>
				<p>Let your audience ask you questions in real time. Collect questions and let people send and upvote the ones they wanna hear.</p>
			</aside>
			<main>
				<h1>{value}</h1>
				<div className="main-content">
					<img src={ logoImage } alt="LetMeAsk logo" />
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