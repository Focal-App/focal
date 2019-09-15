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
            {
                "client_name": "Sammy & David",
                "user_uuid": "user_uuid",
                "uuid": "1111",
                "package": {
                    "package_name": "Premier Wedding",
                    "package_events": [
                        {
                            "event_name": "Engagement",
                            "shoot_date": "2020-07-17T16:53:52Z",
                        },
                        {
                            "event_name": "Wedding",
                            "shoot_date": null,
                        }
                    ],
                },
                "current_stage": {
                    "category": "New Client Inquiry",
                    "step": "Request more information"
                }
            },
            {
                "client_name": "Natasha & Zihao",
                "user_uuid": "user_uuid",
                "uuid": "1234",
                "package": {
                    "package_name": "Engagement",
                    "package_events": [
                        {
                            "event_name": "Engagement",
                            "shoot_date": "2020-09-17T16:53:52Z",
                        }
                    ],
                },
                "current_stage": {
                    "category": "Proposal & Retainer",
                    "step": "Confirm Proposal & Retainer"
                }
            },
        ])

        const getClientsUrl = Endpoints.getClients(user_uuid)
        const apiHandler = new MockAPIHandler({ [getClientsUrl]: [clientsList] });
        const { findByText, getByText } = render(
            <Clients apiHandler={apiHandler} user_uuid={user_uuid} />
        )

        await waitForElement(() =>
            findByText(/Sammy & David/i)
        )

        getByText(/Premier Wedding/i)
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
        const failedData =  MockApiData.errorData(["Issue fetching data"]);
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