import React from 'react';
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import MockAPIHandler from 'utilities/api/mockApiHandler';
import Endpoints from "utilities/api/apiEndpoint";
import MockApiData from "utilities/api/mockApiData";
import { act } from 'react-dom/test-utils';
import Client from "components/Client/Client";

describe('Client Info Flow', () => {
    afterEach(() => {
        cleanup();
    });

    const client_uuid = "1111";
    it(`renders the updated information after successful client information update`, async () => {
        const client = MockApiData.successfulClient({
            uuid: client_uuid,
            contacts: [
            MockApiData.contactData({ first_name: "Natasha" }),
            ]
        });
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
        });
        const apiHandler = new MockAPIHandler({
            [Endpoints.getClient(client_uuid)]: [client],
            [Endpoints.updateClient(client_uuid)]: [updatedClient]
        });
        let component;

        await act(async () => {
            component = render(
                <Client apiHandler={apiHandler} client_uuid={client_uuid} />
            )
        });

        const { findByText, getByText, getAllByText, getByLabelText, getByTestId } = component;

        await waitForElement(() =>
            findByText(/Natasha/i)
        );

        await act(async () => {
            fireEvent.click(getByTestId("edit-client-btn"));
        });

        await waitForElement(() =>
            findByText(/update client/i)
        );

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

        await act(async () => {
            fireEvent.click(getByText("Update Client"));
        });

        await waitForElement(() =>
            findByText(/Zihao Zui/i)
        );
        getByText(/natasha@gmail.com/i);
        getAllByText(/111-111-1111/i);
        getByText(/Referred by Pat/i);
        getByText(/Zihao Zui/i);
        getByText(/zihao@gmail.com/i);
        getByText(/333-333-3333/i)
    });

    it(`renders error banner in modal after failed client information update`, async () => {
        const client = MockApiData.successfulClient({
            uuid: client_uuid,
            contacts: [ MockApiData.contactData({ first_name: "Natasha" }) ]
        });
        const errorClient =  MockApiData.errorData(["Failed Client Update"]);

        const apiHandler = new MockAPIHandler({
            [Endpoints.getClient(client_uuid)]: [client],
            [Endpoints.updateClient(client_uuid)]: [errorClient]
        });
        let component;

        await act(async () => {
            component = render(
                <Client apiHandler={apiHandler} client_uuid={client_uuid} />
            )
        });

        const { findByText, getByText, getByLabelText, getByTestId } = component;

        await waitForElement(() =>
            findByText(/Natasha/i)
        );

        await act(async () => {
            fireEvent.click(getByTestId("edit-client-btn"));
        });

        await waitForElement(() =>
            findByText(/update client/i)
        );

        const clientEmail = getByLabelText("Bride Email");
        fireEvent.change(clientEmail, { target: { value: "natasha@gmail.com" } });

        const partnerFirstName = getByLabelText("Partner First Name");
        fireEvent.change(partnerFirstName, { target: { value: "Zihao" } });

        await act(async () => {
            fireEvent.click(getByText('Update Client'));
        });

        getByText(/Failed Client Update/i)
    })
});
