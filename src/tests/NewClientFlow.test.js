import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import MockAPIHandler from 'utilities/APIHandler/mockApiHandler';
import Endpoints from "utilities/apiEndpoint";
import MockApiData from "utilities/APIHandler/mockApiData";
import { act } from 'react-dom/test-utils';

describe("New Client Flow", () => {
    afterEach(() => {
        cleanup();
    })

    const uuid = "1234";
    const authUser = { uuid: uuid, avatar: "avatar-image-link" };

    it("navigates to Clients Page with new client row if new client submission is successful", async () => {
        const successfulNewClient = MockApiData.successfulClient({ uuid: uuid })
        const clientsList = MockApiData.successData([ MockApiData.partialClientData({ uuid: uuid, client_first_name: "Sammy" }) ]);
        const apiHandler = new MockAPIHandler({ 
            [Endpoints.newClient]: [successfulNewClient], 
            [Endpoints.getClients(uuid)]: [clientsList] 
        });
        let component;

        await act(async () => {
            component = render(
                <MemoryRouter initialEntries={["/clients/new", "/clients"]} initialIndex={0}>
                    <App apiHandler={apiHandler} authUser={authUser}/>
                </MemoryRouter>
            )
        })

        const { getByLabelText, getByText, findByText } = component;

        const clientFirstName = getByLabelText("First Name");
        fireEvent.change(clientFirstName, { target: { value: "Sammy" } });

        await act(async () => {
            fireEvent.click(getByText("Submit"));
        })

        await waitForElement(() => 
            findByText(/sammy/i)
        )
    })

    it("renders error banner if new client submission failed", async () => {
        const failedLoginData = MockApiData.errorData({ client_name: ["can't be blank"] });
        const apiHandler = new MockAPIHandler({ 
            [Endpoints.newClient]: [failedLoginData], 
        });

        let component;

        await act(async () => {
            component = render(
                <MemoryRouter initialEntries={["/clients/new"]} initialIndex={0}>
                    <App apiHandler={apiHandler} authUser={authUser} />
                </MemoryRouter>
            )
        })
        
        const { getByLabelText, getByText, findByText } = component;

        const clientFirstName = getByLabelText("First Name");
        fireEvent.change(clientFirstName, { target: { value: "Sammy" } });
        
        await act(async () => {
            fireEvent.click(getByText("Submit"));
        })

        await waitForElement(() => 
            findByText(/client_name can't be blank/i)
        )
    })
})