import React from 'react';
import './Loader.scss';

const Loader = ({ size = "large" }) => (
    <div className={`loader loader--${size}`}>
       <i className="fas fa-circle-notch"></i>
    </div>
)

export default Loader;