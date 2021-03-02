import AnswerList from './AnswerList';

import './Answer.scss';

const Answers = ({ answers, onSendReply }) => (
    <div className="answers">
        <AnswerList 
            answers={answers} 
            onSendReply={onSendReply}
        />
    </div>
);

export default Answers;