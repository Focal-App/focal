import React from 'react';
import Clients from "./Clients";
import { render, cleanup, waitForElement } from '@testing-library/react';
import MockAPIHandler from 'utilities/APIHandler/mockApiHandler';
import Endpoints from "utilities/apiEndpoint";
import MockApiData from "utilities/APIHandler/mockApiData";

describe('Clients', () => {
    afterEach(() => {
        cleanup();
    })

    const user_uuid = "1234";

    it('renders list of clients if there is client data after successfull call', async () => {
        const clientsList = MockApiData.successData([
            MockApiData.allClientData(),
            MockApiData.allClientData({ 
                client_first_name: "Natasha & Zihao", 
                uuid: "0000",
                package: MockApiData.packageData({ package_name: "Wedding Classic", package_events: [MockApiData.eventData({ shoot_date: "2020-09-17T14:00:00Z" })] }),
                current_stage: MockApiData.taskData({ category: "Proposal & Retainer", step: "Confirm Proposal & Retainer" })
            })
        ])

        const getClientsUrl = Endpoints.getClients(user_uuid)
        const apiHandler = new MockAPIHandler({ [getClientsUrl]: [clientsList] });
        const { findByText, getByText } = render(
            <Clients apiHandler={apiHandler} user_uuid={user_uuid} />
        )

        await waitForElement(() =>
            findByText(/Sammy & David/i)
        )

        getByText(/Wedding Premier/i)
        getByText(/July 17, 2020/i)
        getByText(/New Client Inquiry/i)
        getByText(/Request More Information/i)

        getByText(/Natasha & Zihao/i)
        getByText(/September 17, 2020/i)
        getByText(/Confirm Proposal & Retainer/i)
    })


    it('renders no content text if there is no client data after successful call', async () => {
        const clientsList = MockApiData.successData([]);
        const getClientsUrl = Endpoints.getClients(user_uuid)
        const apiHandler = new MockAPIHandler({ [getClientsUrl]: [clientsList] });
        const { findByText } = render(
            <Clients apiHandler={apiHandler} user_uuid={user_uuid} />
        )

        await waitForElement(() =>
            findByText(/Doesn't look like you have any clients yet!/i)
        )
    })

    it('renders Error Banner after failed fetch', async () => {
        const failedData = MockApiData.errorData(["Issue fetching data"]);
        const getClientsUrl = Endpoints.getClients(user_uuid)
        const apiHandler = new MockAPIHandler({ [getClientsUrl]: [failedData] });
        const { findByText } = render(
            <Clients apiHandler={apiHandler} user_uuid={user_uuid} />
        )

        await waitForElement(() =>
            findByText(/Issue fetching data/i)
        )
    })
})