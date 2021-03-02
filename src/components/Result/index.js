import Button from '../Button';
import LogoImg from '../../undraw_winners_ao2o 2.svg';

import './Result.scss';

const Result = ({
    points,
    onNewGame
}) => (
    <div className="result">
        <h1>Country Quiz</h1>
        <div className="quiz-container">
            <div className="header">
                <img alt="" src={LogoImg} />
            </div>
            <div className="body">
                <h2>Results</h2>
                <p>You got <span className="points">{points}</span> correct answers</p>
            </div>
            <div className="footer">
                <Button onClick={onNewGame} title="Try again" className="btn btn__outline btn__try_again" />
            </div>
        </div>
    </div>
);

export default Result;