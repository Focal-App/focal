import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import MockAPIHandler from 'utilities/api/mockApiHandler';
import Endpoints from "utilities/api/apiEndpoint";
import MockApiData from "utilities/api/mockApiData";
import { act } from 'react-dom/test-utils';

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
            package: MockApiData.packageData({ uuid: package_uuid, package_events: [] }),
            workflows: []
        })
        const updatedPackage =  MockApiData.successData(MockApiData.packageData({
            package_name: "Wedding Classic",
            package_price: 1000000,
            balance_remaining: 500000,
            proposal_signed: true,
            package_contents: "10 Hours of Photographic Coverage",
            uuid: package_uuid,
            package_events: []
        }))
        const updatedWorkflows = MockApiData.successData([
            MockApiData.workflowData({ uuid: 0 }),
        ])
        const apiHandler = new MockAPIHandler({
            [Endpoints.getClient(client_uuid)]: [client],
            [Endpoints.updatePackage(package_uuid)]: [updatedPackage],
            [Endpoints.getWorkflows(client_uuid)]: [updatedWorkflows]
        });

        let component;
        await act(async () => {
            component = render(
                <MemoryRouter initialEntries={[`/client/${client_uuid}`]} initialIndex={0}>
                    <App apiHandler={apiHandler} authUser={authUser}/>
                </MemoryRouter>
            )
        })
        const { findByText, getByText, getByLabelText, getByTestId } = component;

        await waitForElement(() =>
            findByText(/Natasha Lee/i)
        )

        await act(async () => {
            fireEvent.click(getByTestId("edit-package-btn"));
        })

        await waitForElement(() =>
            findByText(/update package/i)
        )

        const packageName = getByLabelText("Package Name");
        fireEvent.change(packageName, { target: { value: "Wedding Classic" } });

        const packagePrice = getByLabelText("Package Price");
        fireEvent.change(packagePrice, { target: { value: "10000" } });

        const balance = getByLabelText("Balance Remaining");
        fireEvent.change(balance, { target: { value: "5000" } });

        const clientHasSignedProposal = getByLabelText("Client Has Signed Proposal");
        fireEvent.click(clientHasSignedProposal);

        const packageContents = getByLabelText("Package Contents");
        fireEvent.change(packageContents, { target: { value: "10 Hours of Photographic Coverage" } });

        await act(async () => {
            fireEvent.click(getByText("Update Package"));
        })

        await waitForElement(() =>
            findByText(/wedding classic/i)
        )
        getByText(/10,000.00/i)
        getByText(/10 Hours of Photographic Coverage/i)
    })

    it(`renders error banner after failed client package update`, async () => {
        const client = MockApiData.successfulClient({
            uuid: client_uuid,
            contacts: [MockApiData.contactData({ first_name: "Natasha" })] ,
            package: MockApiData.packageData({ uuid: package_uuid, package_events: [] }),
            workflows: []
        })
        const failedPackageUpdate =  MockApiData.errorData("Failed package update")
        const apiHandler = new MockAPIHandler({
            [Endpoints.getClient(client_uuid)]: [client],
            [Endpoints.updatePackage(package_uuid)]: [failedPackageUpdate],
        });

        let component;
        await act(async () => {
            component = render(
                <MemoryRouter initialEntries={[`/client/${client_uuid}`]} initialIndex={0}>
                    <App apiHandler={apiHandler} authUser={authUser}/>
                </MemoryRouter>
            )
        })
        const { findByText, getByText, getByLabelText, getByTestId } = component;

        await waitForElement(() =>
            findByText(/Natasha Lee/i)
        )

        await act(async () => {
            fireEvent.click(getByTestId("edit-package-btn"));
        })

        await waitForElement(() =>
            findByText(/update package/i)
        )

        const packageName = getByLabelText("Package Name");
        fireEvent.change(packageName, { target: { value: "Wedding Classic" } });

        await act(async () => {
            fireEvent.click(getByText("Update Package"));
        })

        getByText(/Failed package update/i)
    })

})
