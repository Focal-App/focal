import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import MockAPIHandler from 'utilities/APIHandler/mockApiHandler';
import Endpoints from "utilities/apiEndpoint";
import MockApiData from "utilities/APIHandler/mockApiData";

describe('Package Flow', () => {
    afterEach(() => {
        cleanup();
    })

    const user_uuid = "1234";
    const client_uuid = "1111";
    const authUser = { uuid: user_uuid, avatar: "avatar-image-link" };
    const package_uuid = "1111";
    
    it(`renders the updated information after successful client package update`, async () => {
        const client = MockApiData.successfulClient({ 
            uuid: client_uuid, 
            contacts: [MockApiData.contactData({ first_name: "Natasha" })] ,
            package: MockApiData.packageData({ uuid: package_uuid })
        })
        const updatedPackage =  MockApiData.successfulClient(MockApiData.packageData({ 
            package_name: "Wedding Classic",
            package_price: 500000, 
            balance_remaining: 500000, 
            proposal_signed: true,
            package_contents: "8 Hours of Photographic Coverage",
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
            findByText(/Natasha/i)
        )

        fireEvent.click(getAllByText("Edit")[1]);
        
        await waitForElement(() =>
            findByText(/update package/i)
        )

        const clientEmail = getByLabelText("Package Name");
        fireEvent.change(clientEmail, { target: { value: "Wedding Classic" } });

        const clientPhoneNumber = getByLabelText("Package Price");
        fireEvent.change(clientPhoneNumber, { target: { value: "5000" } });

        const privateNotes = getByLabelText("Balance Remaining");
        fireEvent.change(privateNotes, { target: { value: "5000" } });

        const partnerFirstName = getByLabelText("Client Has Signed Proposal");
        fireEvent.click(partnerFirstName);

        const partnerLastName = getByLabelText("Package Contents");
        fireEvent.change(partnerLastName, { target: { value: "8 Hours of Photographic Coverage" } });

        fireEvent.click(getByText("Update Package"));

        await waitForElement(() =>
            findByText(/Natasha Lee/i)
        )
        getByText(/wedding classic/i)
        getAllByText(/5000.00/i)
        getByText(/8 Hours of Photographic Coverage/i)
    })

})