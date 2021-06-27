import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
	author: {
		name: string;
		avatar: string;
	}
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
	likes: Record<string, {
		authorId: string;
	}>;
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
	likeCount: number;
	likeId: string | undefined;
} 

export function useRoom(roomId: string) {
	const { user } = useAuth();
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
					likeCount: countLikes(value.likes),
                    likeId: getLikeIdIfExists(value.likes),
				}
			});

			setTitle(databaseRoom.title);
			setQuestions(parsedQuestions);
		})

		return () => {
			roomReference.off('value');
		};
	}, [roomId, user?.id]);

	function getRoom() {
		return database.ref(`rooms/${roomId}`);
	}

	function countLikes(likes: Record<string, { authorId: string }>) {
		return Object.values(likes ?? {}).length;
	}

	function getLikeIdIfExists(likes: Record<string, { authorId: string }>) {
		return Object.entries(likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0];
	}

	return { questions, title }
}