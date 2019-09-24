import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DataAdapter, { DefaultText } from 'utilities/api/dataAdapter';
import { Label } from "UI/FormParts";

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

                        <Label label="Private Notes" name="private_notes" />
                        <Field
                            name="private_notes"
                            component="textarea"
                            id="private_notes"
                            placeholder="Add your private notes for this client..."
                        />
                        <ErrorMessage className='field-error' name="private_notes" component="div" />

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
            <Label label={`${contactLabel} First Name`} name={firstName} />
            <Field type="text" name={firstName} id={firstName} />
            <ErrorMessage className='field-error' name={firstName} component="div" />

            <Label label={`${contactLabel} Last Name`} name={lastName} />
            <Field type="text" name={lastName} id={lastName} />
            <ErrorMessage className='field-error' name={lastName} component="div" />

            <Label label={`${contactLabel} Label`} name={label} />
            <Field component="select" name={label} id={label} placeholder={defaultLabel}>
                    <option value="Client">Client</option>
                    <option value="Partner">Partner</option>
                    <option value="Bride">Bride</option>
                    <option value="Groom">Groom</option>
            </Field>
            <ErrorMessage className='field-error' name={label} component="div" />

            <Label label={`${contactLabel} Best Time To Contact`} name={bestTimeToContact} />
            <Field type="text" name={bestTimeToContact} id={bestTimeToContact} />
            <ErrorMessage className='field-error' name={bestTimeToContact} component="div" />

            <Label label={`${contactLabel} Email`} name={email} />
            <Field type="email" name={email} id={email} />
            <ErrorMessage className='field-error' name={email} component="div" />

            <Label label={`${contactLabel} Phone Number`} name={phoneNumber} />
            <Field type="tel" name={phoneNumber} id={phoneNumber} />
            <ErrorMessage className='field-error' name={phoneNumber} component="div" />
        </>
    )
}

export default UpdateClientForm;