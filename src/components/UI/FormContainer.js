import React from 'react';
import './FormContainer.scss';

const FormContainer = (props) => (
    <section className='form-container'>
        {props.children}
    </section>
)

export default FormContainer;