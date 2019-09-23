import React, { useState, useEffect } from "react";
import ClientsPage from "./ClientsPage";
import Error from "UI/Error";
import NoContent from "UI/NoContent";
import Endpoints from "utilities/api/apiEndpoint";
import DataAdapter from "utilities/api/dataAdapter";
import "./ClientsPage.scss";
import ClientsTable from "./ClientsTable";

const Clients = ({ apiHandler, user_uuid, setClients, clients }) => {
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refetchClients, setClientsRefetch] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            setClientsRefetch(false);
            setLoading(true);
            const { data, errors } = await apiHandler.get(Endpoints.getClients(user_uuid));
            if (data) {
                setClients(DataAdapter.toAllClientPartialDataModel(data));
            } else {
                setErrors(errors);
            }
            setLoading(false);
        }
        refetchClients && fetchClients();
    }, [user_uuid, refetchClients, apiHandler, setClients])

    const deleteClient = async (client_uuid) => {
        setLoading(true);
        const { data, errors } = await apiHandler.delete(Endpoints.deleteClient(client_uuid));
        setLoading(false);
        if (data) {
            const clientIndex = clients.findIndex(originalClient => originalClient.uuid === client_uuid);
            clients.splice(clientIndex, 1);
            setClients(Array.from(clients))
        } else {
            setErrors(errors)
        }
    }

    return (
        <ClientsPage loading={loading}>
            {errors && <Error message={errors} />}
            {clients.length > 0
                ? <ClientsTable
                    clients={clients}
                    deleteClient={deleteClient}
                    apiHandler={apiHandler}
                    setClientsRefetch={setClientsRefetch}
                    setErrors={setErrors} />
                : <NoContent
                    message="Doesn't look like you have any clients yet!"
                    subtext="Add a new client to get started" />
            }
        </ClientsPage>
    )
}

export default Clients;