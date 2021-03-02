import './Button.scss';

const Button = ({
    title, 
    className = 'btn', 
    hidden,
    onClick
}) => (
    <button onClick={onClick} hidden={hidden} className={className} >{ title }</button>
);

export default Button;