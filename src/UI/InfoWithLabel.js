import React from "react";
import "./InfoWithLabel.scss";

const InfoWithLabel = ({ label, text, span = false}) => (
    <div className={`info-line ${span && `info-line--span`}`}>
        <h6 className="label">{label}</h6>
        <h4 className="text multiline">{text}</h4>
    </div>
)

export default InfoWithLabel;