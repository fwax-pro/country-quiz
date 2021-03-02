import './Question.scss';

const QuestionFlag = ({flag}) => (
    <div className="question">
        <img alt="" className="img" src={flag}></img>
        <h2>Which country does this flag belong to ?</h2>
    </div>
);

export default QuestionFlag;