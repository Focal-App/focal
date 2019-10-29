import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent, waitForElement, getByTestId, queryByLabelText } from '@testing-library/react';
import MockAPIHandler from 'utilities/api/mockApiHandler';
import Endpoints from "utilities/api/apiEndpoint";
import { act } from 'react-dom/test-utils';
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

        const { getByText, getByTestId, getByLabelText, queryByLabelText } = render(
            <MemoryRouter initialEntries={[`/templates`]} initialIndex={0}>
                <App apiHandler={apiHandler} />
            </MemoryRouter>
        )

        getByText("Templates")
        getByText(/Emails/i)
        getByText(/No templates yet!/i)
        getByText(/Create a new template by clicking the button below./i)

        const nameField = queryByLabelText("Name");
        expect(nameField).toBeNull()

        await act(async () => {
            fireEvent.click(getByTestId("new-template-btn"));
        });

        const templateName = getByLabelText("Name");
        fireEvent.change(templateName, { target: { value: "Request More Information" } });

        getByLabelText("Category");
    })
})