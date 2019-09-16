import React from 'react';
import './Error.scss';
import { formatErrorMessage } from 'utilities/formatErrorMessage';

const Error = ({ message }) => (
    <p className='error--container'>{formatErrorMessage(message)}</p>
)

export default Error;