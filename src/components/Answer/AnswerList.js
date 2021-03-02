import AnswerItem from './AnswerItem';

const AnswerList = ({answers, onSendReply}) => (
    <ul className="answer-list">
        { answers.map((answer, index) => (
            <AnswerItem 
                key={index} 
                position={index} 
                answer={ answer } 
                onSendReply={onSendReply}
            />
        ))}
    </ul>
);

export default AnswerList;