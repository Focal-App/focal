import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import MockAPIHandler from 'utilities/APIHandler/mockApiHandler';
import Endpoints from "utilities/apiEndpoint";
import MockApiData from "utilities/APIHandler/mockApiData";

describe('Event Creation & Update Flow', () => {
    afterEach(() => {
        cleanup();
    })

    const user_uuid = "1234";
    const client_uuid = "1111";
    const package_uuid = "1111";
    const authUser = { uuid: user_uuid, avatar: "avatar-image-link" };
    it(`- renders no event module if there is no existing client events, 
        - creates empty event modules if package is toggled to include wedding and/or engagement
    `, async () => {
        const client = MockApiData.successfulClient({ 
            uuid: client_uuid, 
            contacts: [MockApiData.contactData({ first_name: "Natasha" })] ,
            package: MockApiData.packageData({ uuid: package_uuid })
        })
        const updatedPackage = MockApiData.successfulClient(MockApiData.packageData({ 
            includes_engagement: true,
            includes_wedding: true,
            uuid: package_uuid
        }))
        const apiHandler = new MockAPIHandler({ 
            [Endpoints.getClient(client_uuid)]: [client],
            [Endpoints.updatePackage(package_uuid)]: [updatedPackage]
        });
        const { findByText, getByText, getAllByText, getByLabelText } = render(
            <MemoryRouter initialEntries={[`/client/${client_uuid}`]} initialIndex={0}>
                <App apiHandler={apiHandler} authUser={authUser}/>
            </MemoryRouter>
        )

        await waitForElement(() =>
            findByText(/Natasha Lee/i)
        )

        fireEvent.click(getAllByText("Edit")[1]);
        
        await waitForElement(() =>
            findByText(/update package/i)
        )

        const includeEngagement = getByLabelText("Includes Engagement Event");
        fireEvent.click(includeEngagement);

        const includeWedding = getByLabelText("Includes Wedding Event");
        fireEvent.click(includeWedding);

        fireEvent.click(getByText("Update Package"));

        await waitForElement(() =>
            findByText(/Natasha Lee/i)
        )
        getByText(/engagement shoot location/i)
        getByText(/ceremony location/i)
    })
})