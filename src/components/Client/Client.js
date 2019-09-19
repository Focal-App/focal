import React, { useState, useEffect } from "react";
import ClientPage from "./ClientPage";
import Endpoints from "utilities/apiEndpoint";
import Error from "components/UI/Error";
import DataAdapter from "utilities/APIHandler/dataAdapter";
import "./Client.scss";
import ClientInformation from "./ClientInformation";
import PackageInformation from "./PackageInformation";
import EventInformation from "./EventInformation";

const Client = ({ apiHandler, client_uuid }) => {
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clientData, setClient] = useState({});
    const [clientPackage, setPackage] = useState({})
    const [clientEvents, setEvents] = useState({})

    useEffect(() => {
        const fetchClient = async () => {
            setLoading(true);
            const { data, errors } = await apiHandler.get(Endpoints.getClient(client_uuid));
            if (data) {
                const fullClient = DataAdapter.toFullClientDataModel(data);
                setClient(fullClient);
                setPackage(fullClient.package)
                setEvents(fullClient.events)
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
            <ClientInformation 
                client={clientData.client} 
                apiHandler={apiHandler} 
                setClient={setClient} 
            />
            <PackageInformation 
                clientPackage={clientPackage} 
                apiHandler={apiHandler} 
                setPackage={setPackage} 
                client_uuid={client_uuid} 
            />
            <EventInformation 
                events={clientEvents} 
                apiHandler={apiHandler} 
                setEvents={setEvents} 
                eventPackage={clientPackage} 
            />
        </ClientPage>
    )
}

export default Client;


