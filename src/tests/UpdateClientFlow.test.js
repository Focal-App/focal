import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import MockAPIHandler from 'utilities/APIHandler/mockApiHandler';
import Endpoints from "utilities/apiEndpoint";
import MockApiData from "utilities/APIHandler/mockApiData";

describe('Update Client Flow', () => {
    afterEach(() => {
        cleanup();
    })

    const user_uuid = "1234";
    const client_uuid = "1111";
    const authUser = { uuid: user_uuid, avatar: "avatar-image-link" };
    it(`renders the updated information after successful client information update`, async () => {
        const client = MockApiData.successfulClient({ 
            uuid: client_uuid, 
            contacts: [
            MockApiData.contactData({ first_name: "Natasha" }),
            ] 
        })
        const updatedClient =  MockApiData.successfulClient({ 
            uuid: client_uuid, 
            private_notes: "Referred by Pat.",
            contacts: [
                MockApiData.contactData({ 
                    first_name: "Natasha", 
                    email: "natasha@gmail.com", 
                    phone_number: "111-111-1111", 
                }),
                MockApiData.contactData({ 
                    first_name: "Zihao", 
                    last_name: "Zui",
                    email: "zihao@gmail.com", 
                    phone_number: "333-333-3333", 
                    best_time_to_contact: "Morning",
                    label: "Groom"
                }),
            ]
        })
        const apiHandler = new MockAPIHandler({ 
            [Endpoints.getClient(client_uuid)]: [client],
            [Endpoints.updateClient(client_uuid)]: [updatedClient]
        });
        const { findByText, getByText, getAllByText, getByLabelText } = render(
            <MemoryRouter initialEntries={[`/client/${client_uuid}`]} initialIndex={0}>
                <App apiHandler={apiHandler} authUser={authUser}/>
            </MemoryRouter>
        )

        await waitForElement(() =>
            findByText(/Natasha/i)
        )

        fireEvent.click(getAllByText("Edit")[0]);
        
        await waitForElement(() =>
            findByText(/update client/i)
        )

        const clientEmail = getByLabelText("Bride Email");
        fireEvent.change(clientEmail, { target: { value: "natasha@gmail.com" } });

        const clientPhoneNumber = getByLabelText("Bride Phone Number");
        fireEvent.change(clientPhoneNumber, { target: { value: "111-111-1111" } });

        const privateNotes = getByLabelText("Private Notes");
        fireEvent.change(privateNotes, { target: { value: "Referred by Pat." } });

        const partnerFirstName = getByLabelText("Partner First Name");
        fireEvent.change(partnerFirstName, { target: { value: "Zihao" } });

        const partnerLastName = getByLabelText("Partner Last Name");
        fireEvent.change(partnerLastName, { target: { value: "Zui" } });

        const partnerEmail = getByLabelText("Partner Email");
        fireEvent.change(partnerEmail, { target: { value: "zihao@gmail.com" } });

        const partnerPhoneNumber = getByLabelText("Partner Phone Number");
        fireEvent.change(partnerPhoneNumber, { target: { value: "333-333-3333" } });

        const partnerBestTimeToContact = getByLabelText("Partner Best Time To Contact");
        fireEvent.change(partnerBestTimeToContact, { target: { value: "Morning" } });

        const partnerLabel = getByLabelText("Partner Label");
        fireEvent.change(partnerLabel, { target: { value: "Groom" } });

        fireEvent.click(getByText("Update Client"));

        await waitForElement(() =>
            findByText(/Zihao Zui/i)
        )
        findByText(/natasha@gmail.com/i)
        findByText(/111-111-1111/i)
        findByText(/Referred by Pat/i)
        findByText(/Zihao Zui/i)
        findByText(/zihao@gmail.com/i)
        findByText(/333-333-3333/i)
    })
})