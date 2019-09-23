import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Label, Checkbox } from "UI/FormParts";
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
        .moreThan(0, "Package Price must be at least 1"),
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
            onSubmit={(values, actions) => {
                handleSubmit(values)
            }}
            render={({
                isSubmitting,
            }) => (
                    <Form className="update-client-information--container">
                        <h3>Package</h3>
                        <Label label={`Package Name`} name={'package_name'} />
                        <Field type="text" name={'package_name'} id={'package_name'} />
                        <ErrorMessage className='field-error' name={'package_name'} component="div" />

                        <Label label={`Package Contents`} name={'package_contents'} />
                        <Field type="text" component="textarea" name={'package_contents'} id={'package_contents'} />
                        <ErrorMessage className='field-error' name={'package_contents'} component="div" />

                        <Label label={`Package Price`} name={'package_price'} />
                        <Field type="number" name={'package_price'} id={'package_price'} />
                        <ErrorMessage className='field-error' name={'package_price'} component="div" />

                        <Label label={`Discount Offered`} name={'discount_offered'} />
                        <Field type="number" name={'discount_offered'} id={'discount_offered'} />
                        <ErrorMessage className='field-error' name={'discount_offered'} component="div" />

                        <Label label={`Retainer Amount`} name={'retainer_price'} />
                        <Field type="number" name={'retainer_price'} id={'retainer_price'} />
                        <ErrorMessage className='field-error' name={'retainer_price'} component="div" />

                        <Label label={`Retainer Paid By Client`} name={'retainer_paid_amount'} />
                        <Field type="number" name={'retainer_paid_amount'} id={'retainer_paid_amount'} />
                        <ErrorMessage className='field-error' name={'retainer_paid_amount'} component="div" />

                        <Label label={`Balance Remaining`} name={'balance_remaining'} />
                        <Field type="number" name={'balance_remaining'} id={'balance_remaining'} />
                        <ErrorMessage className='field-error' name={'balance_remaining'} component="div" />

                        <section className="package-update--checks">
                            <Field type="checkbox" component={Checkbox} label={`Includes Engagement Event`} name={'engagement_included'} id={'engagement_included'} />
                            <ErrorMessage className='field-error' name={'engagement_included'} component="div" />

                            <Field type="checkbox" component={Checkbox} label={`Includes Wedding Event`} name={'wedding_included'} id={'wedding_included'} />
                            <ErrorMessage className='field-error' name={'wedding_included'} component="div" />

                            <hr />

                            <Field type="checkbox" component={Checkbox} label={`Client Has Signed Proposal`} name={'proposal_signed'} id={'proposal_signed'} />
                            <ErrorMessage className='field-error' name={'proposal_signed'} component="div" />

                            <Field type="checkbox" name={'retainer_paid'} label={`Client Has Paid Retainer`} component={Checkbox} id={'retainer_paid'} />
                            <ErrorMessage className='field-error' name={'retainer_paid'} component="div" />

                            <Field type="checkbox" name={'balance_received'} label={`Client Has Paid Full Balance`} component={Checkbox} id={'balance_received'} />
                            <ErrorMessage className='field-error' name={'balance_received'} component="div" />
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