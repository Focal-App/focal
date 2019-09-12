import React, { useState, useEffect } from "react";
import ClientsPage from "./ClientsPage";
import Error from "components/UI/Error";
import { formatDate } from "utilities/date";
import NoContent from "components/UI/NoContent";
import "./ClientsPage.scss";

const Clients = ({ apiHandler, user_uuid }) => {
    const [clients, setClients] = useState([])
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            setLoading(true);
            const { data, errors } = await apiHandler.get(`/api/user/${user_uuid}/clients/data`);
            console.log({ data, errors })
            if (data) {
                setClients(data);
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
        return data.map(client => {
            const { uuid, client_name, current_stage } = client;
            const { package_events, package_name } = client.package;
            const { category, step } = current_stage
            console.log(package_events)
            return (
                <tr key={uuid}>
                    <th>{client_name ? client_name : "-"}</th>
                    <th>{package_name ? package_name : "-"}</th>
                    <th>{package_events.length > 0 && package_events[0].shoot_date ? formatDate(package_events[0].shoot_date) : "-"}</th>
                    <th>
                        <div className="client--category">{category ? category : "-"}</div>
                        <div className="client--stage">{step ? step : "-"}</div>
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