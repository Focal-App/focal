import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import MockAPIHandler from 'utilities/api/mockApiHandler';
import Endpoints from "utilities/api/apiEndpoint";
import MockApiData from "utilities/api/mockApiData";
import { act } from 'react-dom/test-utils';

describe("Workflow Flow", () => {
    afterEach(() => {
        cleanup();
    })

    const user_uuid = "1234";
    const client_uuid = "1111";
    const workflow_uuid = "5555";
    const authUser = { uuid: user_uuid, avatar: "avatar-image-link" };
    const package_uuid = "1111";

    it("renders closeout, engagement and wedding workflow after creating a new package with engagement and wedding toggled as included", async () => {
        const client = MockApiData.successfulClient({
            uuid: client_uuid,
            contacts: [MockApiData.contactData({ first_name: "Natasha" })],
            package: {},
            workflows: [
                MockApiData.workflowData({ workflow_name: "New Client Inquiry", uuid: 0 }),
                MockApiData.workflowData({ workflow_name: "Proposal & Retainer", uuid: 1 }),
            ],
        })
        const updatedPackage = MockApiData.successData(MockApiData.packageData({
            package_name: "Wedding Classic",
            wedding_included: true,
            engagement_included: true,
            uuid: package_uuid
        }))
        const updatedWorkflows = MockApiData.successData([
            MockApiData.workflowData({ workflow_name: "New Client Inquiry", uuid: 0 }),
            MockApiData.workflowData({ workflow_name: "Proposal & Retainer", uuid: 1 }),
            MockApiData.workflowData({ 
                workflow_name: "Closeout",
                uuid: 2,
                tasks: [
                    MockApiData.taskData({ step: "request feedback", uuid: 20, }),
                    MockApiData.taskData({ step: "save & share feedback", uuid: 21, }),
                    MockApiData.taskData({ step: "send out package deliverables", uuid: 22, }),
                    MockApiData.taskData({ step: "send out gallery link to vendors", uuid: 23, }),
                    MockApiData.taskData({ step: "send out 1 year anniversary email", uuid: 24, }),
                ]
            }),
            MockApiData.workflowData({ 
                workflow_name: "Engagement",
                uuid: 3,
                tasks: [
                    MockApiData.taskData({ step: "schedule shoot date", uuid: 30, }),
                    MockApiData.taskData({ step: "send 3 week pre shoot reminder", uuid: 31, }),
                    MockApiData.taskData({ step: "send 1 week pre shoot reminder", uuid: 32, }),
                    MockApiData.taskData({ step: "complete shoot", uuid: 33, }),
                    MockApiData.taskData({ step: "send thank you email to client", uuid: 34, }),
                    MockApiData.taskData({ step: "edit engagement images", uuid: 35, }),
                    MockApiData.taskData({ step: "share gallery link", uuid: 36, }),
                    MockApiData.taskData({ step: "create & share blog", uuid: 37, }),
                ]
            }),
            MockApiData.workflowData({ 
                workflow_name: "Wedding",
                uuid: 4,
                tasks: [
                    MockApiData.taskData({ step: "send 4 week pre-shoot final invoice", uuid: 40, }),
                    MockApiData.taskData({ step: "send 4 week pre shoot reminder", uuid: 41, }),
                    MockApiData.taskData({ step: "edit wedding images", uuid: 42, }),
                ]
            }),
        ])
        const apiHandler = new MockAPIHandler({
            [Endpoints.getClient(client_uuid)]: [client],
            [Endpoints.createPackage(client_uuid)]: [updatedPackage],
            [Endpoints.getWorkflows(client_uuid)]: [updatedWorkflows]
        });
        let component;
        await act(async () => {
            component = render(
                <MemoryRouter initialEntries={[`/client/${client_uuid}`]} initialIndex={0}>
                    <App apiHandler={apiHandler} authUser={authUser} />
                </MemoryRouter>
            )
        })
        const { findByText, getByText, getByTestId, getByLabelText } = component;

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

        const includeEngagement = getByLabelText("Includes Engagement Event");
        fireEvent.click(includeEngagement);

        const includeWedding = getByLabelText("Includes Wedding Event");
        fireEvent.click(includeWedding);

        await act(async () => {
            fireEvent.click(getByText("Update Package"));
        })

        await waitForElement(() =>
            findByText(/closeout/i)
        )
        getByText(/request feedback/i)
        getByText(/save & share feedback/i)
        getByText(/send out package deliverables/i)
        getByText(/send out gallery link to vendors/i)
        getByText(/send out 1 year anniversary email/i)

        getByText(/schedule shoot date/i)
        getByText(/send 3 week pre shoot reminder/i)
        getByText(/send 1 week pre shoot reminder/i)
        getByText(/complete shoot/i)
        getByText(/send thank you email to client/i)
        getByText(/edit engagement images/i)
        getByText(/share gallery link/i)
        getByText(/create & share blog/i)

        getByText(/send 4 week pre-shoot final invoice/i)
        getByText(/send 4 week pre shoot reminder/i)
        getByText(/edit wedding images/i)
    })

    it("renders a successful checkmark after hitting an incomplete todo", async () => {
        const task_uuid = "7";

        const client = MockApiData.successData(
            MockApiData.allClientData({
                uuid: client_uuid,
                user_uuid: user_uuid,
                package: {},
                workflows: [
                    MockApiData.workflowData({
                        uuid: workflow_uuid,
                        workflow_name: "New Client Inquiry",
                        completed_tasks: 0,
                        tasks: [
                            MockApiData.taskData({ step: "request more information", uuid: task_uuid, is_completed: false }),
                            MockApiData.taskData({ step: "save client information", uuid: "8", is_completed: false }),
                        ]
                    })
                ]
            })
        )
        const updatedTask = MockApiData.successData(MockApiData.taskData({ step: "request more information", uuid: task_uuid, is_completed: true }))

        const apiHandler = new MockAPIHandler({
            [Endpoints.getClient(client_uuid)]: [client],
            [Endpoints.updateTask(task_uuid)]: [updatedTask]
        });

        let component;

        await act(async () => {
            component = render(
                <MemoryRouter initialEntries={[`/client/${client_uuid}`]} initialIndex={0}>
                    <App apiHandler={apiHandler} authUser={authUser} />
                </MemoryRouter>
            )
        })
        const { findByText, getByText, getAllByText, getAllByTestId } = component;

        await waitForElement(() =>
            findByText(/New Client Inquiry/i)
        )

        getByText(/0 \/ 2 Tasks Completed/i)

        const checkmarks = getAllByTestId("todo-checkmark");

        fireEvent.click(checkmarks[0]);

        await waitForElement(() =>
            findByText(/1 \/ 2 Tasks Completed/i)
        )
    })
})