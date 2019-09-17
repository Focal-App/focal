import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const NewClient = Yup.object().shape({
    client_first_name: Yup.string()
        .required('First Name required'),
    client_last_name: Yup.string()
        .notRequired(),
    client_email: Yup.string()
        .email('Invalid email')
        .notRequired(),
    client_phone_number: Yup.string()
        .notRequired(),
    private_notes: Yup.string()
        .notRequired()
});

const Label = ({ label, name }) => (
    <label htmlFor={name} >{label}</label>
)

const NewClientForm = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{
                client_first_name: '',
                client_last_name: '',
                client_email: '',
                client_phone_number: '',
                private_notes: ''
            }}
            validationSchema={NewClient}
            onSubmit={(values, actions) => {
                onSubmit(values)
            }}
            render={({
                isSubmitting,
            }) => (
                <Form>
                    <Label label="First Name" name="client_first_name" />
                    <Field type="text" name="client_first_name" id="client_first_name" />
                    <ErrorMessage className='field-error' name="client_first_name" component="div" />

                    <Label label="Last Name" name="client_last_name" />
                    <Field type="text" name="client_last_name" id="client_last_name" />
                    <ErrorMessage className='field-error' name="client_last_name" component="div" />

                    <Label label="Email" name="client_email" />
                    <Field type="email" name="client_email" id="client_email" />
                    <ErrorMessage className='field-error' name="client_email" component="div" />

                    <Label label="Phone Number" name="client_phone_number" />
                    <Field type="tel" name="client_phone_number" id="client_phone_number" />
                    <ErrorMessage className='field-error' name="client_phone_number" component="div" />

                    <Label label="Private Notes" name="private_notes" />
                    <Field
                        name="private_notes"
                        component="textarea"
                        id="private_notes"
                        placeholder="Add your private notes for this client..."
                    />
                    <ErrorMessage className='field-error' name="private_notes" component="div" />

                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        />
    );
};

export default NewClientForm;