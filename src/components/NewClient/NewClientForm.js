import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Label } from "components/UI/FormParts";

const NewClient = Yup.object().shape({
    first_name: Yup.string()
        .required('First Name required'),
    last_name: Yup.string()
        .notRequired(),
    email: Yup.string()
        .email('Invalid email')
        .notRequired(),
    phone_number: Yup.string()
        .notRequired(),
    private_notes: Yup.string()
        .notRequired(),
    label: Yup.string()
        .notRequired(),
    best_time_to_contact: Yup.string()
        .notRequired(),
});

const NewClientForm = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                private_notes: '',
                label: '',
                best_time_to_contact: ''
            }}
            validationSchema={NewClient}
            onSubmit={(values, actions) => {
                onSubmit(values)
            }}
            render={({
                isSubmitting,
            }) => (
                <Form>
                    <Label label="First Name" name="first_name" />
                    <Field type="text" name="first_name" id="first_name" />
                    <ErrorMessage className='field-error' name="first_name" component="div" />

                    <Label label="Last Name" name="last_name" />
                    <Field type="text" name="last_name" id="last_name" />
                    <ErrorMessage className='field-error' name="last_name" component="div" />

                    <Label label="Client Type" name="label" />
                    <Field type="text" name="label" id="label" placeholder="E.g. Groom, Bride, Partner" />
                    <ErrorMessage className='field-error' name="label" component="div" />

                    <Label label="Best Time To Contact" name="best_time_to_contact" />
                    <Field type="text" name="best_time_to_contact" id="best_time_to_contact" />
                    <ErrorMessage className='field-error' name="best_time_to_contact" component="div" />

                    <Label label="Email" name="email" />
                    <Field type="email" name="email" id="email" />
                    <ErrorMessage className='field-error' name="email" component="div" />

                    <Label label="Phone Number" name="phone_number" />
                    <Field type="tel" name="phone_number" id="phone_number" />
                    <ErrorMessage className='field-error' name="phone_number" component="div" />

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