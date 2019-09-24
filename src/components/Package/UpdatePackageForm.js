import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CheckboxWithError, FieldWithError } from "UI/FormParts";
import DataAdapter from "utilities/api/dataAdapter";

const ClientPackageSchema = Yup.object().shape({
    package_name: Yup.string()
        .required('Package Name required'),
    proposal_signed: Yup.boolean()
        .notRequired(),
    package_contents: Yup.string()
        .notRequired(),
    package_price: Yup.number()
        .notRequired()
        .moreThan(0.99, "Package Price must be at least 1"),
    retainer_price: Yup.string()
        .notRequired(),
    retainer_paid_amount: Yup.string()
        .notRequired(),
    retainer_paid: Yup.boolean()
        .notRequired(),
    discount_offered: Yup.string()
        .notRequired(),
    balance_remaining: Yup.string()
        .notRequired(),
    balance_received: Yup.boolean()
        .notRequired(),
    wedding_included: Yup.boolean()
        .notRequired(),
    engagement_included: Yup.boolean()
        .notRequired(),
})


const UpdatePackageForm = ({ initialValues, setModalVisibility, handleSubmit }) => {
    const formReadyValues = DataAdapter.toFormReadyData(initialValues);
    return (
        <Formik
            initialValues={formReadyValues}
            validationSchema={ClientPackageSchema}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
            render={({
                isSubmitting,
            }) => (
                    <Form className="update-client-information--container">
                        <h3>Package</h3>
                        <FieldWithError label={`Package Name`} name={'package_name'} type="text"/>
                        <FieldWithError label={`Package Contents`} name={'package_contents'} type="text" component="textarea"/>
                        <FieldWithError label={`Package Price`} name={'package_price'} type="number"/>
                        <FieldWithError label={`Discount Offered`} name={'discount_offered'} type="number"/>
                        <FieldWithError label={`Retainer Amount`} name={'retainer_price'} type="number"/>
                        <FieldWithError label={`Retainer Paid By Client`} name={'retainer_paid_amount'} type="number"/>
                        <FieldWithError label={`Balance Remaining`} name={'balance_remaining'} type="number"/>

                        <section className="package-update--checks">
                            <CheckboxWithError label={`Includes Wedding Event`} name={'wedding_included'} />
                            <CheckboxWithError label={`Includes Engagement Event`} name={'engagement_included'} />
                            <hr />
                            <CheckboxWithError label={`Client Has Signed Proposal`} name={'proposal_signed'} />
                            <CheckboxWithError label={`Client Has Paid Retainer`} name={'retainer_paid'} />
                            <CheckboxWithError label={`Client Has Paid Full Balance`} name={'balance_received'} />
                        </section>

                        <div className="btn-span">
                            <button className="btn-tertiary" onClick={() => setModalVisibility(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                Update Package
                            </button>
                        </div>
                    </Form>
                )
            }
        />
    );
};

export default UpdatePackageForm;