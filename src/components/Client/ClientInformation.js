import React, { useState } from "react";
import UpdateClientInformation from "./UpdateClientInformation";
import FormContainer from "components/UI/FormContainer";
import Modal from "components/UI/Modal";
import Success from "components/UI/Success";
import DataAdapter, { DefaultText } from "utilities/APIHandler/dataAdapter";
import Endpoints from "utilities/apiEndpoint";
import Error from "components/UI/Error";

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
                {modalVisible && (
                    <Modal loading={loading} setModalVisibility={setModalVisibility} title="">
                        <FormContainer>
                            {errors && <Error message={errors} />}
                            {success
                                ? <Success text="Success!" />
                                : <UpdateClientInformation
                                    initialValues={client}
                                    setModalVisibility={setModalVisibility}
                                    handleSubmit={handleSubmit} />
                            }
                        </FormContainer>
                    </Modal>
                )}
                <div className="client-page--header">
                    <h1>Client Information</h1>
                    <button className="btn-tertiary" onClick={() => setModalVisibility(true)}>Edit</button>
                </div>
                <section className="client-information">
                    {contacts[0] && <ContactColumn contact={contacts[0]} defaultLable="Client" />}
                    {contacts[1] && <ContactColumn contact={contacts[1]} defaultLable="Partner" />}
                    <hr />
                    <span>
                        <h6 className="label">Private Notes</h6>
                        <h4 className="text">{private_notes}</h4>
                    </span>
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
            <h6 className="label">{containerLabel} Name</h6>
            <h4 className="text">{first_name} {last_name !== DefaultText.noContent && last_name}</h4>

            <h6 className="label">{containerLabel} Phone Number</h6>
            <h4 className="text">{phone_number}</h4>

            <h6 className="label">{containerLabel} Email</h6>
            <h4 className="text">{email}</h4>

            <h6 className="label">{containerLabel} Best Time To Call</h6>
            <h4 className="text">{best_time_to_contact}</h4>
        </section>
    )
}

export default ClientInformation;