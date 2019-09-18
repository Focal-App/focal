import React, { useState, useEffect } from "react";
import ClientPage from "./ClientPage";
import Endpoints from "utilities/apiEndpoint";
import Error from "components/UI/Error";
import DataAdapter, { DefaultText } from "utilities/APIHandler/dataAdapter";
import "./Client.scss";

const Client = ({ apiHandler, client_uuid }) => {
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clientData, setClient] = useState({});

    useEffect(() => {
        const fetchClient = async () => {
            setLoading(true);
            const { data, errors } = await apiHandler.get(Endpoints.getClient(client_uuid));
            if (data) {
                setClient(DataAdapter.toFullClientDataModel(data));
            } else {
                setErrors(errors);
            }
            setLoading(false);
        }
        fetchClient();
    }, [])

    return (
        <ClientPage loading={loading}>
            {errors && <Error message={errors} />}
            <section className="client-workflow--container">
                <h1>Workflow</h1>
                <section className="client-workflow">
                </section>
            </section>
            { clientData.client && <ClientInformation client={clientData.client} /> }
        </ClientPage>
    )
}

const ClientInformation = ({ client }) => {
    const contactColumn = (contact, defaultLabel) => {
        const { first_name, last_name, email, phone_number, best_time_to_contact, label } = contact;
        const containerLabel = label ? label : defaultLabel;
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
    if (client) {
        const { contacts, private_notes } = client;
        return (
            <section className="client-information--container">
                <div className="client-page--header">
                    <h1>Client Information</h1>
                </div>
                <section className="client-information">
                    {contacts[0] && contactColumn(contacts[0], contacts[0].label ? contacts[0].label : "Client")}
                    {contacts[1] && contactColumn(contacts[1], contacts[1].label ? contacts[1].label : "Partner")}
                    <hr />
                    <span>
                        <h6 className="label">Private Notes</h6>
                        <h4 className="text">{private_notes}</h4>
                    </span>
                </section>
            </section>

        )
    }
}

export default Client;