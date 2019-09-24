import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DataAdapter, { DefaultText } from 'utilities/api/dataAdapter';
import { FieldWithError, DropdownFieldWithError } from "UI/FormParts";

const ClientInformationSchema = Yup.object().shape({
    contacts: Yup.array().of(
        Yup.object().shape({
            first_name: Yup.string()
                .required('First Name required'),
            last_name: Yup.string()
                .notRequired(),
            email: Yup.string()
                .email('Invalid email')
                .notRequired(),
            phone_number: Yup.string()
                .notRequired(),
            label: Yup.string()
                .notRequired(),
            best_time_to_contact: Yup.string()
                .notRequired(),
        })
    ),
    private_notes: Yup.string()
        .notRequired(),
});

const UpdateClientForm = ({ initialValues, setModalVisibility, handleSubmit }) => {
    const formReadyValues = DataAdapter.toFormReadyData(initialValues);
    return (
        <Formik
            initialValues={formReadyValues}
            validationSchema={ClientInformationSchema}
            onSubmit={(values, actions) => {
                handleSubmit(values)
            }}
            render={({
                isSubmitting,
                errors,
                values
            }) => (
                    <Form className="update-client-information--container">
                        <ContactForm contact={initialValues.contacts[0]} contactIndex={0} defaultLabel={"Client"} />
                        <ContactForm contact={initialValues.contacts[1]} contactIndex={1} defaultLabel={"Partner"} />
                        <h3>Private Notes</h3>
                        <FieldWithError
                            label={`Private Notes`}
                            name={'private_notes'}
                            type="text"
                            component="textarea"
                            placeholder="Add your private notes for this client..." />

                        <div className="btn-span">
                            <button className="btn-tertiary" onClick={() => setModalVisibility(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                Update Client
                            </button>
                        </div>
                    </Form>
                )
            }
        />
    );
};

const ContactForm = ({ contact, contactIndex, defaultLabel }) => {
    const contactLabel = contact.label === DefaultText.noContent ? defaultLabel : contact.label;
    const contacts = `contacts[${contactIndex}]`
    const firstName = `${contacts}.first_name`
    const lastName = `${contacts}.last_name`
    const label = `${contacts}.label`
    const bestTimeToContact = `${contacts}.best_time_to_contact`
    const email = `${contacts}.email`
    const phoneNumber = `${contacts}.phone_number`
    return (
        <>
            <h3>{contactLabel} Information</h3>
            <FieldWithError label={`${contactLabel} First Name`} name={firstName} type="text" />
            <FieldWithError label={`${contactLabel} Last Name`} name={lastName} type="text" />

            <DropdownFieldWithError label={`${contactLabel} Label`} name={label} placeholder={defaultLabel} >
                <option value="Client">Client</option>
                <option value="Partner">Partner</option>
                <option value="Bride">Bride</option>
                <option value="Groom">Groom</option>
            </DropdownFieldWithError>

            <FieldWithError label={`${contactLabel} Best Time To Contact`} name={bestTimeToContact} type="text" />
            <FieldWithError label={`${contactLabel} Email`} name={email} type="email" />
            <FieldWithError label={`${contactLabel} Phone Number`} name={phoneNumber} type="tel" />
        </>
    )
}

export default UpdateClientForm;