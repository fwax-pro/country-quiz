import { Answers} from '../Answer';
import Button from '../Button';
import LogoImg from '../../undraw_adventure_4hum 1.svg';
import { QuestionCapital, QuestionFlag } from '../Question';

import './Play.scss';

const Play = ({ 
    currentCountry, 
    responses,
    questionType,
    hiddenNextButton,
    onSendReply,
    onNext
}) => {

    const template = questionType === 'capital'
    ? <QuestionCapital capitalName={ currentCountry ? currentCountry.capital : '' } />
    : <QuestionFlag flag={currentCountry ? currentCountry.flag : ''} />;

    return (
        <div className="play">
            <div className="logo"><img alt="" src={LogoImg} /></div>
            <h1>Country Quiz</h1>
            <div className="quiz-container">
                { template }
                <Answers onSendReply={onSendReply} answers={ responses } />
                <div className="__right">
                    <Button onClick={onNext} hidden={hiddenNextButton} title="Next" className="btn" />
                </div>
            </div>
        </div>
    );
}

export default Play;