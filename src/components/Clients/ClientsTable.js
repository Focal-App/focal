import React from "react";
import { Link } from "react-router-dom";
import { DefaultText } from "utilities/api/dataAdapter";
import RowTask from "components/Clients/RowTask";

const ClientsTable = ({ clients, deleteClient, apiHandler, setErrors, setClientsRefetch }) => {
    const createClientsTable = (data) => {
        return data.map(client => (
            <ClientRow  
                key={client.uuid}
                client={client}
                apiHandler={apiHandler}
                setErrors={setErrors}
                deleteClient={deleteClient}
                setClientsRefetch={setClientsRefetch}
            />
        ))
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
                    <th></th>
                </tr>
                {createClientsTable(clients)}
            </tbody>
        </table>
    )
}

export default ClientsTable;

const ClientRow = ({ client, apiHandler, setErrors, deleteClient, setClientsRefetch }) => {
    const {
        client_first_name,
        partner_first_name,
        current_stage,
        package_name,
        upcoming_shoot_date,
        uuid
    } = client;
    const coupleName = partner_first_name === DefaultText.noContent
        ? client_first_name
        : `${client_first_name} & ${partner_first_name}`;

    return (
        <tr key={uuid}>
            <th>{coupleName}</th>
            <th>{package_name}</th>
            <th>{upcoming_shoot_date}</th>
            <th>
                {
                    current_stage.step !== DefaultText.noContent
                        ? <RowTask
                            task={current_stage}
                            apiHandler={apiHandler}
                            setClientsRefetch={setClientsRefetch}
                            setErrors={setErrors} />
                        : "No more tasks!"
                }
            </th>
            <th>
                <Link to={`/client/${uuid}`}>View</Link>
            </th>
            <th>
                <button onClick={() => deleteClient(uuid)}>Delete</button>
            </th>
        </tr>
    )
}
