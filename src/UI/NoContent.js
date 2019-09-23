import React from 'react';
import './NoContent.scss';

const NoContent = ({ message, subtext }) => (
    <div className='no-content'>
        {message && message}
        <br />
        <p>{subtext && subtext}</p>
    </div>
)

export default NoContent;