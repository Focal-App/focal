import React from "react";
import './Success.scss';

const Success = ({ text, subtext }) => (
    <section className="success--container">
        <i className="far fa-check-circle"></i>
        <h2>{text}</h2>
        <p>{subtext}</p>
    </section>
)

export default Success;