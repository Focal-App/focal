import React from 'react';
import Client from "./Client";
import { render, cleanup, waitForElement, getAllByText } from '@testing-library/react';
import MockAPIHandler from 'utilities/APIHandler/mockApiHandler';
import Endpoints from "utilities/apiEndpoint";
import MockApiData from "utilities/APIHandler/mockApiData";

describe('Client', () => {
    afterEach(() => {
        cleanup();
    })

    const user_uuid = "1234";

    it('renders client, package, events, and workflow information', async () => {
        const client = MockApiData.successData(
            MockApiData.allClientData({ 
                uuid: user_uuid,
                workflows: [
                    MockApiData.workflowData({ 
                        workflow_name: "New Client Inquiry",
                        tasks: [
                            MockApiData.taskData({ step: "request more information"  }),
                            MockApiData.taskData({ step: "save client information"  }),
                        ]
                    }),
                    MockApiData.workflowData({ 
                        workflow_name: "Proposal & Retainer",
                        tasks: [
                            MockApiData.taskData({ step: "send proposal"  }),
                            MockApiData.taskData({ step: "commit to proposal"  }),
                            MockApiData.taskData({ step: "receive signed proposal & retainer"  }),
                            MockApiData.taskData({ step: "receive retainer fee"  }),
                        ]
                    })
                ]
            })
        )

        
        const apiHandler = new MockAPIHandler({ 
            [Endpoints.getClient(user_uuid)]: [client]
        });
        const { findAllByText, getByText, getAllByText } = render(<Client apiHandler={apiHandler} client_uuid={user_uuid} />)

        await waitForElement(() =>
            findAllByText(/client information/i)
        )

        getByText(/sammy lee/i)
        getByText(/client@gmail.com/i)
        getByText(/123-456-7890/i)
        getByText(/evening/i)

        getByText(/wedding premier/i)
        getByText(/Eight Hours of Photographic Coverage/i)
        getAllByText(/4800.00/i)

        getByText(/engagement event/i)
        getAllByText(/April 17, 2020/i)
        getByText(/Have clients bring extra flowers and a see through chair./i)
        getByText(/Los Angeles Poppy Fields/i)
        getByText(/6AM - 11AM/i)

        getByText(/wedding event/i)
        getByText(/August 17, 2020/i)
        getByText(/Cindy, 111-111-1111/i)
        getByText(/Redbird DTLA/i)
        getByText(/8AM - 11PM/i)
        getByText(/Viviana DTLA/i)
        getByText(/Coordinate with Cindy on exact time details for bride prep/i)

        getByText(/new client inquiry/i)
        getByText(/request more information/i)
        getByText(/save client information/i)

        getAllByText(/proposal & retainer/i)
        getByText(/send proposal/i)
        getByText(/commit to proposal/i)
        getByText(/receive signed proposal & retainer/i)
        getByText(/receive retainer fee/i)
    })
})