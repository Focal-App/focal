import React from 'react';
import AuthenticatedHeader from './AuthenticatedHeader';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import MockAPIHandler from 'utilities/api/mockApiHandler';

describe('Header', () => {
    const mockApiHandler = new MockAPIHandler();

    afterEach(() => {
        cleanup();
    })

    it('renders Authenticated Header if user exists', () => {
        const { getByAltText, getByText } = render(<AuthenticatedHeader user={{}} apiHandler={mockApiHandler} />)
        fireEvent.click(getByAltText('avatar'))

        getByText('Log Out')
    })

    it('clicking log out in Authenticated Header should redirect back to Log In Page', () => {
        const { getByAltText, getByText } = render(
            <AuthenticatedHeader user={{}} apiHandler={mockApiHandler} />
        )
        fireEvent.click(getByAltText('avatar'))
        fireEvent.click(getByText('Log Out'))

        waitForElement(() =>
            getByText('Log In')
        )
    })
})