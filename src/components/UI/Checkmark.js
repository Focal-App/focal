import React from "react";
import "./Checkmark.scss";

const Checkmark = ({ completed, size = "large" }) => {
    const sizeStyle =  `checkmark-icon--${size}`;
    const completedStyle = completed ? 'checkmark-icon--complete' : 'checkmark-icon--incomplete';
    return (
        <div className={`checkmark-icon ${sizeStyle} ${completedStyle}`}>
        {completed ? <i className="far fa-check-square"></i> : <i className="far fa-square"></i>}
    </div>
    )
}

export default Checkmark;