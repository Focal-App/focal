import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import MockAPIHandler from 'utilities/api/mockApiHandler';
import Endpoints from "utilities/api/apiEndpoint";
import MockApiData from "utilities/api/mockApiData";
import { act } from 'react-dom/test-utils';

describe('Clients Flow', () => {
    afterEach(() => {
        cleanup();
    })

    const user_uuid = "1234";
    const client_uuid = "1111";
    const authUser = { uuid: user_uuid, avatar: "avatar-image-link" };
    it(`renders list of clients if there is client data after successfull call, 
        clicking view will take user to client detail page`, async () => {
        const clientsList = MockApiData.successData([
            MockApiData.partialClientData({
                client_first_name: "Sammy",
                partner_first_name: "David",
                upcoming_shoot_date: "2020-07-17T14:00:00Z",
                uuid: client_uuid
            }),
            MockApiData.partialClientData({ 
                uuid: "0000",
                client_first_name: "Natasha",
                partner_first_name: "Zihao",
                package_name: "Wedding Classic", 
                upcoming_shoot_date: "2020-09-17T14:00:00Z",
                current_stage: MockApiData.taskData({ 
                    category: "Proposal & Retainer", step: "Confirm Proposal & Retainer" 
                })
            })
        ])
        const client = MockApiData.successData(
            MockApiData.allClientData({ uuid: client_uuid })
        )
        const getClientsUrl = Endpoints.getClients(user_uuid)
        const apiHandler = new MockAPIHandler({ 
            [getClientsUrl]: [clientsList],
            [Endpoints.getClient(client_uuid)]: [client]
        });

        let component;

        await act(async () => {
            component = render(
                <MemoryRouter initialEntries={["/clients"]} initialIndex={0}>
                    <App apiHandler={apiHandler} authUser={authUser}/>
                </MemoryRouter>
            )
        })

        const { findByText, getByText, getAllByText } = component;

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

        await act(async () => {
            fireEvent.click(getAllByText("View")[0]);
        })
        
        await waitForElement(() =>
            findByText(/sammy lee/i)
        )
        getByText(/client information/i)
        getAllByText(/package/i)
        getAllByText(/new client inquiry/i)
    })


    it('renders no content text if there is no client data after successful call', async () => {
        const clientsList = MockApiData.successData([]);
        const getClientsUrl = Endpoints.getClients(user_uuid)
        const apiHandler = new MockAPIHandler({ [getClientsUrl]: [clientsList] });
        let component;
        await act(async() => {
            component = render(
                <MemoryRouter initialEntries={["/clients"]} initialIndex={0}>
                    <App apiHandler={apiHandler} authUser={authUser}/>
                </MemoryRouter>
            )
        })
        const { findByText } = component;

        await waitForElement(() =>
            findByText(/Doesn't look like you have any clients yet!/i)
        )
    })

    it('renders Error Banner after failed fetch', async () => {
        const failedData = MockApiData.errorData(["Issue fetching data"]);
        const getClientsUrl = Endpoints.getClients(user_uuid)
        const apiHandler = new MockAPIHandler({ [getClientsUrl]: [failedData] });
        let component;
        await act(async() => {
            component = render(
                <MemoryRouter initialEntries={["/clients"]} initialIndex={0}>
                    <App apiHandler={apiHandler} authUser={authUser}/>
                </MemoryRouter>
            )
        })
        const { findByText } = component;

        await waitForElement(() =>
            findByText(/Issue fetching data/i)
        )
    })
})