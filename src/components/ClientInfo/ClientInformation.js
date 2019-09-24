import React, { useState } from "react";
import UpdateClientForm from "./UpdateClientForm";
import DataAdapter, { DefaultText } from "utilities/api/dataAdapter";
import Endpoints from "utilities/api/apiEndpoint";
import ModalForm from "UI/ModalForm";
import InfoWithLabel from "UI/InfoWithLabel";

const ClientInformation = ({ client, apiHandler, setClient }) => {
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisibility] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        const transformedValues = DataAdapter.toApiReadyClient(values);
        const { data, errors } = await apiHandler.put(Endpoints.updateClient(client.uuid), transformedValues);
        setLoading(false);
        if (data) {
            setClient(DataAdapter.toFullClientDataModel(data));
            setSuccess(true);
            setTimeout(() => {
                setModalVisibility(false);
                setSuccess(false)
            }, 1000)
        } else {
            setErrors(errors);
        }
    }

    if (client) {
        const { contacts, private_notes } = client;
        return (
            <section className="client-information--container">
                <ModalForm
                    isLoading={loading}
                    isVisible={modalVisible}
                    setModalVisibility={setModalVisibility}
                    errors={errors}
                    success={success}
                >
                    <UpdateClientForm
                        initialValues={client}
                        setModalVisibility={setModalVisibility}
                        handleSubmit={handleSubmit} />
                </ModalForm>
                <div className="client-page--header">
                    <h1>Client Information</h1>
                    <button data-testid="edit-client-btn" className="btn-tertiary" onClick={() => setModalVisibility(true)}>Edit</button>
                </div>
                <section className="client-information">
                    {contacts[0] && <ContactColumn contact={contacts[0]} defaultLabel="Client" />}
                    {contacts[1] && <ContactColumn contact={contacts[1]} defaultLabel="Partner" />}
                    <hr />
                    <InfoWithLabel label={`Private Notes`} text={private_notes} span={true} />
                </section>
            </section>
        )
    } else {
        return null;
    }
}

const ContactColumn = ({ contact, defaultLabel }) => {
    const { first_name, last_name, email, phone_number, best_time_to_contact, label } = contact;
    const containerLabel = label !== DefaultText.noContent ? label : defaultLabel;
    return (
        <section className="client-information--column">
            <InfoWithLabel label={`${containerLabel} Name`} text={`${first_name} ${last_name !== DefaultText.noContent ? last_name : ''}`} />
            <InfoWithLabel label={`${containerLabel} Phone Number`} text={phone_number} />
            <InfoWithLabel label={`${containerLabel} Email`} text={email} />
            <InfoWithLabel label={`${containerLabel} Best Time To Call`} text={best_time_to_contact} />
        </section>
    )
}

export default ClientInformation;