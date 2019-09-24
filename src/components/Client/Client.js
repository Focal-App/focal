import React, { useState, useEffect } from "react";
import ClientPage from "./ClientPage";
import Endpoints from "utilities/api/apiEndpoint";
import Error from "UI/Error";
import DataAdapter from "utilities/api/dataAdapter";
import "./Client.scss";
import ClientInformation from "components/ClientInfo/ClientInformation";
import PackageInformation from "components/Package/PackageInformation";
import EventInformation from "components/Event/EventInformation";
import Workflows from "../Workflow/Workflows";

const Client = ({ apiHandler, client_uuid }) => {
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clientData, setClient] = useState({});
    const [clientPackage, setPackage] = useState({});
    const [clientEvents, setEvents] = useState([]);
    const [clientWorkflows, setWorkflows] = useState([]);
    const [refetchWorkflow, setRefetchWorkflow] = useState(false);
    const [refetchEvents, setRefetchEvents] = useState(false);

    useEffect(() => {
        const fetchClient = async () => {
            setLoading(true);
            const { data, errors } = await apiHandler.get(Endpoints.getClient(client_uuid));
            if (data) {
                const fullClient = DataAdapter.toFullClientDataModel(data);
                setClient(fullClient);
                setPackage(fullClient.package)
                setEvents(fullClient.events)
                setWorkflows(fullClient.workflows)
            } else {
                setErrors(errors);
            }
            setLoading(false);
        }

        fetchClient();
    }, [client_uuid, apiHandler])

    const fetchWorkflows = async () => {
        setRefetchWorkflow(false)
        setLoading(true);
        const { data, errors } = await apiHandler.get(Endpoints.getWorkflows(client_uuid));
        if (data) {
            const workflows = data.map(workflow => DataAdapter.toWorkflowModel(workflow));
            setWorkflows(workflows)
        } else {
            setErrors(errors);
        }
        setLoading(false);
    }
    refetchWorkflow && fetchWorkflows();

    const fetchEvents = async () => {
        setRefetchEvents(false)
        setLoading(true);
        const { data, errors } = await apiHandler.get(Endpoints.getEvents(clientPackage.uuid));
        if (data) {
            const events = data.map(event => DataAdapter.toEventModel(event));
            setEvents(events)
        } else {
            setErrors(errors);
        }
        setLoading(false);
    }
    refetchEvents && fetchEvents();

    return (
        <ClientPage loading={loading}>
            {errors && <Error message={errors} />}
            <Workflows
                workflows={clientWorkflows}
                apiHandler={apiHandler}
                setWorkflows={setWorkflows}
            />
            <section className='client-modules--container'>
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
                    setRefetchWorkflow={setRefetchWorkflow}
                    setRefetchEvents={setRefetchEvents}
                />
                <EventInformation
                    events={clientEvents}
                    apiHandler={apiHandler}
                    setEvents={setEvents}
                    eventPackage={clientPackage}
                />
            </section>

        </ClientPage>
    )
}

export default Client;


