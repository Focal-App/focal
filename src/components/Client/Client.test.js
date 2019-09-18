import React from 'react';
import Client from "./Client";
import { render, cleanup, waitForElement } from '@testing-library/react';
import MockAPIHandler from 'utilities/APIHandler/mockApiHandler';
import Endpoints from "utilities/apiEndpoint";
import MockApiData from "utilities/APIHandler/mockApiData";

describe('Client', () => {
    afterEach(() => {
        cleanup();
    })

    const user_uuid = "1234";

    it('renders client information', async () => {
        const client = MockApiData.successData(
            MockApiData.allClientData({ uuid: user_uuid })
        )
        const apiHandler = new MockAPIHandler({ 
            [Endpoints.getClient(user_uuid)]: [client]
        });
        const { findByText, getByText } = render(<Client apiHandler={apiHandler} client_uuid={user_uuid} />)

        await waitForElement(() =>
            findByText(/client information/i)
        )

        getByText(/sammy lee/i)
        getByText(/client@gmail.com/i)
        getByText(/123-456-7890/i)
        getByText(/evening/i)
    })
})