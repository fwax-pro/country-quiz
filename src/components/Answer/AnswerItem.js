import React from 'react';

const AnswerItem = ({position, answer, onSendReply}) => {
    const letters = ['a','b','c','d'];
    const { title } = answer;

    const { isGoodAnswer, isReveal, disabled } = answer;
    let classDynamic = 'answer-item';
    let answerFeedback = null;
    if(isReveal) {
        answerFeedback = isGoodAnswer 
        ? <i className="material-icons">check_circle_outline</i>
        : <i className="material-icons">highlight_off</i>;

        classDynamic += isGoodAnswer ? ' answer-item__good ' : ' answer-item__wrong ';
    }

    return (
        <li className={classDynamic}>
            <button disabled={disabled} onClick={() => onSendReply(position) }>
                <span className="position">{letters[position]}</span>
                <span className="title">{title}</span>
                <span className="feedback">{ answerFeedback }</span>
            </button>
        </li>
    )
}

export default AnswerItem;