import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import MockAPIHandler from 'utilities/APIHandler/mockApiHandler';

describe('Login Flow', () => {
    afterEach(() => {
        cleanup();
    })

    it('renders Client Page after successful fetch for user data during Login', async () => {
        const successfulLoginData = {
            "data": {
                "data": {
                    "avatar": "avatar-image-link",
                    "email": "email",
                    "first_name": "test-user",
                    "provider": "google",
                    "uuid": "uuid"
                }
            }
        };
        const apiHandler = new MockAPIHandler(successfulLoginData);
        const { findByText } = render(
            <MemoryRouter initialEntries={["/login/uuid", "/clients"]} initialIndex={0}>
                <App apiHandler={apiHandler} />
            </MemoryRouter>
        )

        await waitForElement(() =>
            findByText(/clients/i)
        )
    })

    it('renders Login Page with Error Banner after failed fetch for user data during Login', async () => {
        const failedLoginData = {
            "data": {
                "errors": ["Issue logging in"]
            }
        };
        const apiHandler = new MockAPIHandler(failedLoginData);
        const { findAllByText, findByText } = render(
            <MemoryRouter initialEntries={["/login/uuid"]} initialIndex={0}>
                <App apiHandler={apiHandler} />
            </MemoryRouter>
        )

        await waitForElement(() =>
            findAllByText(/log in/i)
        )
        findByText(/issue logging in/i)
    })
})