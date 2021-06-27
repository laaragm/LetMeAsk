import '../styles/roomCode.scss';
import copyImage from '../assets/images/copy.svg';

import { Button } from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

type RoomCodeProps = {
	code: string;
}

export function RoomCode(props: RoomCodeProps) {
	function copyRoomCode() {
		navigator.clipboard.writeText(props.code);
	}

	return(
		<button className="room-code" onClick={ copyRoomCode }>
			<div className="copy-icon">
				<FileCopyOutlinedIcon />
			</div>
			<span> Room #{ props.code }</span>
		</button>
	);
}