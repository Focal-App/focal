import React, { useState, useEffect } from "react";
import ClientsPage from "./ClientsPage";
import Error from "components/UI/Error";
import NoContent from "components/UI/NoContent";
import { Link } from "react-router-dom";
import Endpoints from "utilities/apiEndpoint";
import DataAdapter, { DefaultText } from "utilities/APIHandler/dataAdapter";
import "./ClientsPage.scss";

const Clients = ({ apiHandler, user_uuid, setClients, clients }) => {
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            setLoading(true);
            const { data, errors } = await apiHandler.get(Endpoints.getClients(user_uuid));
            if (data) {
                setClients(DataAdapter.toAllClientPartialDataModel(data));
            } else {
                setErrors(errors);
            }
        setLoading(false);
        }
        fetchClients();
    }, [user_uuid])

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
                client_first_name, 
                partner_first_name,
                current_stage: { category, step }, 
                package_name, 
                upcoming_shoot_date,
                uuid
            } = allClientData;
            const coupleName = partner_first_name === DefaultText.noContent 
                                ? client_first_name 
                                : `${client_first_name} & ${partner_first_name}`;

            return (
                <tr key={uuid}>
                    <th>{coupleName}</th>
                    <th>{package_name}</th>
                    <th>{upcoming_shoot_date}</th>
                    <th>
                        <div className="client--category">{category}</div>
                        <div className="client--stage">{step}</div>
                    </th>
                    <th>
                        <Link to={`/client/${uuid}`}>View</Link>
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
                    <th>Package</th>
                    <th>Shoot Date</th>
                    <th>Stage</th>
                    <th></th>
                </tr>
                {createClientsTable(clients)}
            </tbody>
        </table>
    )
}

export default Clients;