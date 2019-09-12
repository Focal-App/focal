import React from 'react';
import './Error.scss';

const Error = ({ message }) => (
    <p className='error--container'>{message}</p>
)

export default Error;