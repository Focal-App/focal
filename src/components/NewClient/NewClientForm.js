import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FieldWithError, DropdownFieldWithError } from "UI/FormParts";

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
                label: 'Client',
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

                        <FieldWithError label={`First Name`} name={"first_name"} type="text" />
                        <FieldWithError label={`Last Name`} name={"last_name"} type="text" />
                        <DropdownFieldWithError label={`Label`} name={'label'} >
                            <option value="Client">Client</option>
                            <option value="Partner">Partner</option>
                            <option value="Bride">Bride</option>
                            <option value="Groom">Groom</option>
                        </DropdownFieldWithError>
                        <FieldWithError label={`Best Time To Contact`} name={"best_time_to_contact"} type="text" />
                        <FieldWithError label={`Email`} name={"email"} type="text" />
                        <FieldWithError label={`Phone Number`} name={"phone_number"} type="tel" />
                        <FieldWithError
                            label={`Private Notes`}
                            name={'private_notes'}
                            type="text"
                            component="textarea"
                            placeholder="Add your private notes for this client..." />

                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
        />
    );
};

export default NewClientForm;