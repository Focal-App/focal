import React, { useState, useEffect } from "react";
import ClientPage from "./ClientPage";
import Endpoints from "utilities/apiEndpoint";
import Error from "components/UI/Error";
import DataAdapter from "utilities/APIHandler/dataAdapter";
import "./Client.scss";
import ClientInformation from "./ClientInformation";

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
            <ClientInformation client={clientData.client} apiHandler={apiHandler} setClient={setClient} />
        </ClientPage>
    )
}

export default Client;