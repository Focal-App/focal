import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, waitForElement } from '@testing-library/react';
import MockAPIHandler from 'utilities/api/mockApiHandler';
import Endpoints from "utilities/api/apiEndpoint";
import MockApiData from "utilities/api/mockApiData";

describe('Templates Flow', () => {
    afterEach(() => {
        cleanup();
    })
    const uuid = "1234";

    it('renders a no content Template page when there is no templates', async () => {
        const apiHandler = new MockAPIHandler({
            [Endpoints.getTemplates(uuid)]: [{ templates: [] }]
        })

        const { getByText } = render(
            <MemoryRouter initialEntries={[`/templates`]} initialIndex={0}>
                <App apiHandler={apiHandler} />
            </MemoryRouter>
        )

        getByText("Templates")
        getByText("Hello")
    })
})