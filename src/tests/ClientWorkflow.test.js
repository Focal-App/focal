import React from 'react';
import { App } from 'App';
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, waitForElement, fireEvent, getByTestId, getAllByTestId } from '@testing-library/react';
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

    it("renders a successful checkmark after hitting an incomplete todo", async () => {
        const client = MockApiData.successData(
            MockApiData.allClientData({
                uuid: client_uuid,
                user_uuid: user_uuid,
                workflows: [
                    MockApiData.workflowData({
                        uuid: workflow_uuid,
                        workflow_name: "New Client Inquiry",
                        completed_tasks: 0,
                        tasks: [
                            MockApiData.taskData({ step: "request more information", uuid: "7", is_completed: false }),
                            MockApiData.taskData({ step: "save client information", uuid: "8", is_completed: false }),
                        ]
                    }),
                    MockApiData.workflowData({
                        uuid: "6",
                        workflow_name: "Proposal & Retainer",
                        completed_tasks: 0,
                        tasks: [
                            MockApiData.taskData({ step: "send proposal", uuid: "9", }),
                            MockApiData.taskData({ step: "commit to proposal", uuid: "10", }),
                            MockApiData.taskData({ step: "receive signed proposal & retainer", uuid: "11", }),
                            MockApiData.taskData({ step: "receive retainer fee", uuid: "12", }),
                        ]
                    })
                ]
            })
        )
        const updatedWorkflow = MockApiData.successData(MockApiData.workflowData({
            uuid: workflow_uuid,
            workflow_name: "New Client Inquiry",
            completed_tasks: 1,
            tasks: [
                MockApiData.taskData({ step: "request more information", uuid: "7", is_completed: true }),
                MockApiData.taskData({ step: "save client information", uuid: "8", is_completed: false }),
            ]
        }))

        const apiHandler = new MockAPIHandler({
            [Endpoints.getClient(client_uuid)]: [client],
            [Endpoints.updateWorkflow(workflow_uuid)]: [updatedWorkflow]
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


    })
})