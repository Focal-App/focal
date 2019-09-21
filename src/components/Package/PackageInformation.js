import React, { useState } from "react";
import FormContainer from "UI/FormContainer";
import Modal from "UI/Modal";
import Success from "UI/Success";
import DataAdapter from "utilities/api/dataAdapter";
import Endpoints from "utilities/api/apiEndpoint";
import Error from "UI/Error";
import UpdatePackageForm from "./UpdatePackageForm";
import Checkmark from "UI/Checkmark";

const PackageInformation = ({ clientPackage, apiHandler, setPackage, client_uuid }) => {
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisibility] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        const transformedValues = DataAdapter.toApiReadyClient(values);
        let response;
        if (transformedValues.hasOwnProperty('uuid')) {
            response = await apiHandler.put(Endpoints.updatePackage(clientPackage.uuid), transformedValues);
        } else {
            response = await apiHandler.post(Endpoints.createPackage(client_uuid), transformedValues);
        }
        const { data, errors } = response;
        setLoading(false);
        if (data) {
            setPackage(DataAdapter.toPackageModel(data));
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false)
                setModalVisibility(false);
            }, 1000)
        } else {
            setErrors(errors);
        }
    }

    if (clientPackage) {
        const {
            package_name, proposal_signed, package_contents, package_price, balance_received,
            retainer_price, retainer_paid_amount, retainer_paid, discount_offered, balance_remaining,
            wedding_included, engagement_included
        } = clientPackage;

        return (
            <section className="client-package--container">
                {modalVisible && (
                    <Modal loading={loading} setModalVisibility={setModalVisibility} title="">
                        <FormContainer>
                            {errors && <Error message={errors} />}
                            {success
                                ? <Success text="Success!" />
                                : <UpdatePackageForm
                                    initialValues={clientPackage}
                                    setModalVisibility={setModalVisibility}
                                    handleSubmit={handleSubmit} />
                            }
                        </FormContainer>
                    </Modal>
                )}
                <div className="client-page--header">
                    <h1>Package</h1>
                    <button className="btn-tertiary" onClick={() => setModalVisibility(true)}>Edit</button>
                </div>
                <section className="package-information">
                    <h2>{package_name}</h2>
                    <h4 className="multiline">{package_contents}</h4>

                    <hr />

                    <div className="cost-line">
                        <h4>${package_price}</h4>
                        <h4>${discount_offered}</h4>
                        <h4>${retainer_paid_amount}</h4>
                        <hr />
                        <h4>${balance_remaining}</h4>
                    </div>

                    <div className="cost-description">
                        <h6>Package Price</h6>
                        <h6>Discount</h6>
                        <h6>Retainer Price Paid ({retainer_price})</h6>
                        <div />
                        <h6>Remaining Balance</h6>
                    </div>

                    <hr />

                    <BooleanLine completed={wedding_included} label={"Includes Wedding"} />
                    <BooleanLine completed={engagement_included} label={"Includes Engagement"} />

                    <hr />

                    <BooleanLine completed={retainer_paid} label={"Retainer Paid"} />
                    <BooleanLine completed={proposal_signed} label={"Proposal Signed"} />
                    <BooleanLine completed={balance_received} label={"Balance Received"} />
                </section>
            </section>
        )
    } else {
        return null;
    }
}

const BooleanLine = ({ completed, label }) => (
    <div className="boolean-line">
        <Checkmark size="small" completed={completed} />
        <h4>{label}</h4>
    </div>
)

export default PackageInformation;