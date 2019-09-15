import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import MockAPIHandler from 'utilities/APIHandler/mockApiHandler';
import Endpoints from "utilities/apiEndpoint";
import MockApiData from "utilities/APIHandler/mockApiData";

describe('Login Flow', () => {
    afterEach(() => {
        cleanup();
    })
    const uuid = "1234";

    it('renders Client Page after successful fetch for user data during Login', async () => {
        const successfulLoginData = MockApiData.successfulLoginData({ uuid: uuid })
        const clientsList = MockApiData.successData([]);
        const apiHandler = new MockAPIHandler({ 
            [Endpoints.getUser(uuid)]: [successfulLoginData], 
            [Endpoints.getClients(uuid)]: [clientsList] 
        });
        const { findAllByText } = render(
            <MemoryRouter initialEntries={[`/login/${uuid}`, "/clients"]} initialIndex={0}>
                <App apiHandler={apiHandler} />
            </MemoryRouter>
        )

        await waitForElement(() =>
            findAllByText(/clients/i)
        )
    })

    it('renders Login Page with Error Banner after failed fetch for user data during Login', async () => {
        const failedLoginData = MockApiData.errorData(["Issue logging in"]);
        const apiHandler = new MockAPIHandler({ [Endpoints.getUser(uuid)]: [failedLoginData],  });
        const { findAllByText, getByText } = render(
            <MemoryRouter initialEntries={[`/login/${uuid}`]} initialIndex={0}>
                <App apiHandler={apiHandler} />
            </MemoryRouter>
        )

        await waitForElement(() =>
            findAllByText(/log in/i)
        )

        getByText(/issue logging in/i)
    })
})