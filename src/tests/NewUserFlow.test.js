import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import MockAPIHandler from 'utilities/api/mockApiHandler';
import Endpoints from "utilities/api/apiEndpoint";
import MockApiData from "utilities/api/mockApiData";
import { act } from 'react-dom/test-utils';

describe("New User Flow", () => {
    afterEach(() => {
        cleanup();
    })

    const uuidUserTest = "1234";
    const authedUserTest = { uuid: uuidUserTest, avatar: "avaatr-image-link" };

    // Assuming authentication works...
    it("Empty clients page should have \"Add New Client\" button" , async() =>{
        const apiHandler = new MockAPIHandler({
            [Endpoints.getClients(uuidUserTest)] : [MockApiData.successData([])]
        });

        let routedApp;
        act(() => {
            routedApp = render(
                <MemoryRouter initialEntries = {["/clients"]} initialIndex = {0}>
                    <App apiHandler={apiHandler} authUser={authedUserTest}/>
                </MemoryRouter>
            )
        });

        await routedApp.findByText("Add New Client");
    });
});