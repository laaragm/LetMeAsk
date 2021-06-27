import { useEffect, useState } from "react";
import { database } from "../services/firebase";

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

export function useRoom(roomId: string) {
	const [ questions, setQuestions ] = useState<QuestionType[]>([]);
	const [ title, setTitle ] = useState('');

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

	return { questions, title }
}