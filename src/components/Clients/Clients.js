import React, { useState, useEffect } from "react";
import ClientsPage from "./ClientsPage";
import Error from "components/UI/Error";
import NoContent from "components/UI/NoContent";
import Endpoints from "utilities/apiEndpoint";
import DataAdapter from "utilities/APIHandler/dataAdapter";
import "./ClientsPage.scss";

const Clients = ({ apiHandler, user_uuid }) => {
    const [clients, setClients] = useState([])
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            setLoading(true);
            const { data, errors } = await apiHandler.get(Endpoints.getClients(user_uuid));
            if (data) {
                setClients(DataAdapter.toAllClientDataModel(data));
            } else {
                setErrors(errors);
            }
        setLoading(false);
        }
        fetchClients();
    }, [apiHandler, user_uuid])

    return (
        <ClientsPage loading={loading}>
            {errors && <Error message={errors} />}
            {clients.length > 0 
                ? <ClientsTable clients={clients} />
                : <NoContent 
                    message="Doesn't look like you have any clients yet!" 
                    subtext="Add a new client to get started" />
            }
        </ClientsPage>
    )
}

const ClientsTable = ({ clients }) => {
    const createClientsTable = (data) => {
        return data.map(allClientData => {
            const { 
                client: { client_first_name, uuid }, 
                current_stage: { category, step }, 
                package: { package_name, upcoming_shoot_date } 
            } = allClientData;

            return (
                <tr key={uuid}>
                    <th>{client_first_name}</th>
                    <th>{package_name}</th>
                    <th>{upcoming_shoot_date}</th>
                    <th>
                        <div className="client--category">{category}</div>
                        <div className="client--stage">{step}</div>
                    </th>
                </tr>
            )
        })
    }

    return (
        <table>
            <tbody>
                <tr>
                    <th>Client</th>
                    <th>Event</th>
                    <th>Shoot Date</th>
                    <th>Stage</th>
                </tr>
                {createClientsTable(clients)}
            </tbody>
        </table>
    )
}

export default Clients;