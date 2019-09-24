import React from "react";
import "./Checkmark.scss";

const Checkmark = ({ completed, size = "large" }) => {
    const sizeStyle =  `checkmark-icon--${size}`;
    const completedStyle = completed ? 'checkmark-icon--complete' : 'checkmark-icon--incomplete';
    return (
        <div className={`checkmark-icon ${sizeStyle} ${completedStyle}`}>
            {completed 
                ? <i data-testid="todo-checkmark--complete" className="far fa-check-square"></i>
                : <i data-testid="todo-checkmark--incomplete" className="far fa-square"></i> 
            }
        </div>
    )
}

export const Included = ({ completed, size = "large" }) => {
    const sizeStyle =  `checkmark-icon--${size}`;
    const completedStyle = completed ? 'checkmark-icon--complete' : 'checkmark-icon--incomplete';
    return (
        <div className={`checkmark-icon included-icons ${sizeStyle} ${completedStyle}`}>
            {completed 
                ? <i className="fas fa-check"></i>
                : <i className="fas fa-times"></i>
            }
        </div>
    )
}

export default Checkmark;