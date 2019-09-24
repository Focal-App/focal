import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import MockAPIHandler from 'utilities/api/mockApiHandler';
import Endpoints from "utilities/api/apiEndpoint";
import MockApiData from "utilities/api/mockApiData";
import { act } from 'react-dom/test-utils';

describe('Event Creation & Update Flow', () => {
    afterEach(() => {
        cleanup();
    })

    const user_uuid = "1234";
    const client_uuid = "1111";
    const package_uuid = "5555";
    const authUser = { uuid: user_uuid, avatar: "avatar-image-link" };

    it(`renders no event module if there is no existing client events, 
        creates empty event modules if package is toggled to include wedding and/or engagement
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
            [Endpoints.updatePackage(package_uuid)]: [updatedPackage],
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

    it(`renders the updated information after successful event update`, async () => {
        const event1_uuid = "2222";
        const client = MockApiData.successfulClient({ 
            uuid: client_uuid, 
            contacts: [MockApiData.contactData({ first_name: "Natasha" })],
            package: MockApiData.packageData({ 
                uuid: package_uuid,
                package_events: [MockApiData.eventData({ 
                    uuid: event1_uuid, 
                    package_uuid: package_uuid 
                })] 
            })
        })
        const updatedEvent = MockApiData.successData([
            MockApiData.eventData({ 
                shoot_date: "2020-05-17T14:00:00Z",
                shoot_location: "El Matador State Beach",
                shoot_time: "4pm - 8pm",
                notes: "Reminder to review the clients attire for a beach shoot",
                uuid: event1_uuid,
                package_uuid: package_uuid
            })
        ])
        const apiHandler = new MockAPIHandler({ 
            [Endpoints.getClient(client_uuid)]: [client],
            [Endpoints.updateEvent(event1_uuid)]: [updatedEvent],
            [Endpoints.createEvent(package_uuid)]: [updatedEvent]
        });
        let component;

        await act(async () => {
            component = render(
                <MemoryRouter initialEntries={[`/client/${client_uuid}`]} initialIndex={0}>
                    <App apiHandler={apiHandler} authUser={authUser}/>
                </MemoryRouter>
            )
        })
        const { findByText, getByText, getAllByText, getByLabelText } = component;

        await waitForElement(() =>
            findByText(/Natasha Lee/i)
        )

        await act(async () => {
            fireEvent.click(getAllByText("Edit")[2]);
        })
        
        await waitForElement(() =>
            findByText(/update event/i)
        )

        const shootDate = getByLabelText("Shoot Date");
        fireEvent.change(shootDate, { target: { value: "2020-05-17" } });

        const shootLocation = getByLabelText("Shoot Location");
        fireEvent.change(shootLocation, { target: { value: "El Matador State Beach" } });

        const shootTime = getByLabelText("Shoot Time");
        fireEvent.change(shootTime, { target: { value: "4pm - 8pm" } });

        const notes = getByLabelText("Notes");
        fireEvent.change(notes, { target: { value: "Reminder to review the clients attire for a beach shoot" } });

        await act(async () => {
            fireEvent.click(getByText("Update Event"));
        })

        await waitForElement(() =>
            findByText(/Natasha Lee/i)
        )
        
        getByText(/May 17, 2020/i)
        getByText(/El Matador State Beach/i)
        getByText(/4pm - 8pm/i)
        getByText(/Reminder to review the clients attire for a beach shoot/i)
    })

    it(`renders error banner in modal after failed event update`, async () => {
        const event1_uuid = "2222";
        const client = MockApiData.successfulClient({ 
            uuid: client_uuid, 
            contacts: [MockApiData.contactData({ first_name: "Natasha" })],
            package: MockApiData.packageData({ 
                uuid: package_uuid,
                package_events: [MockApiData.eventData({ 
                    uuid: event1_uuid, 
                    package_uuid: package_uuid 
                })] 
            })
        })
        const failedEventUpdate = MockApiData.errorData([ "Failed event update"])
        const apiHandler = new MockAPIHandler({ 
            [Endpoints.getClient(client_uuid)]: [client],
            [Endpoints.updateEvent(event1_uuid)]: [failedEventUpdate],
        });
        let component;

        await act(async () => {
            component = render(
                <MemoryRouter initialEntries={[`/client/${client_uuid}`]} initialIndex={0}>
                    <App apiHandler={apiHandler} authUser={authUser}/>
                </MemoryRouter>
            )
        })
        const { findByText, getByText, getAllByText } = component;

        await waitForElement(() =>
            findByText(/Natasha Lee/i)
        )

        await act(async () => {
            fireEvent.click(getAllByText("Edit")[2]);
        })
        
        await waitForElement(() =>
            findByText(/update event/i)
        )

        await act(async () => {
            fireEvent.click(getByText("Update Event"));
        })

        findByText(/Failed event update/i)
    })
})