import classes from './Button.module.css';

const btnType = {
    'confirm': classes.confirm,
    'cancel': classes.cancel,
    'open': classes.open
};


const Button = (props) => {
    return <button className={`${classes.btn} ${btnType[props.type]}`} onClick={props.onClick}> {props.children} </button>
};

export default Button;