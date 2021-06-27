import logoImage from '../assets/images/logo.svg';
import '../styles/room.scss';

import { useParams } from 'react-router-dom';

import { CustomButton } from '../components/CustomButton';
import { RoomCode } from '../components/RoomCode';

type RoomParameters = {
    id: string;
}

export function Room() {
    const parameters = useParams<RoomParameters>();

    return(
        <div id="page-room">
            <header> 
                <div className="content">
                    <img src={ logoImage } alt="Letmeask" />
                    <RoomCode code={ parameters.id } />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1> Sala React </h1>
                    <span> 4 perguntas </span>
                </div>

                <form>
                    <textarea placeholder="What do you want to ask?" />

                    <div className="form-footer">
                        <span> 
                            In order to ask a question, please <button> login </button>.
                        </span>
                        <CustomButton 
                            title="Send question"
                            cssClass="send-question-button"
                        />
                    </div>
                </form>
            </main>
        </div>
    );
}