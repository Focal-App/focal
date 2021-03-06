const successResult = (data = {}) => {
    return {
        data: {
            data: data
        }
    }
}

const errorResult = (errors = []) => {
    return {
        data: {
            errors: errors
        }
    }
}

const MockApiData = {
    successData: (dataObject) => {
        return successResult(dataObject);
    },
    errorData: (errorsArray) => {
        return errorResult(errorsArray)
    },
    userData: (dataObject) => {
        let apiData = {
            avatar: "avatar-image-link",
            email: "email",
            first_name: "test-user",
            provider: "google",
            uuid: "1234"
        }
        return Object.assign(apiData, dataObject);
    },
    successfulLoginData: (dataObject) => {
        let apiData = MockApiData.userData(dataObject);
        return successResult(apiData);
    },
    contactData: (dataObject) => {
        let apiData = {
            first_name: "Natasha",
            last_name: "Lee",
            email: "client@gmail.com",
            phone_number: "123-456-7890",
            label: "Bride",
            best_time_to_contact: "Evening",
            uuid: "cc14121c-ff53-4edb-832b-8adda60cb372"
        };
        return Object.assign(apiData, dataObject);
    },
    clientData: (dataObject) => {
        let apiData = {
            contacts: [
                MockApiData.contactData()
            ],
            private_notes: null,
            user_uuid: "6602aa08-765f-4197-9237-b69da4ca496f",
            uuid: "cc14121c-ff53-4edb-832b-8adda60cb372"
        }
        return Object.assign(apiData, dataObject);
    },
    taskData: (dataObject) => {
        let apiData = {
            category: "New Client Inquiry",
            client_uuid: "cc14121c-ff53-4edb-832b-8adda60cb372",
            event_uuid: "6607cce2-0d61-4fb9-8caa-058fc62c73ca",
            is_completed: false,
            step: "Request More Information",
            uuid: "fe71fd1a-32a5-497c-b480-a510bf94bace"
        }
        return Object.assign(apiData, dataObject);
    },
    workflowData: (dataObject) => {
        let apiData = {
            order: 0,
            uuid:"6f524831-fa75-42c8-9a7c-f8ecad3a721b",
            workflow_name:"New Client Inquiry",
            completed_tasks: 1,
            incomplete_tasks: 2,
            tasks: [
                MockApiData.taskData({ is_completed: false, uuid: "1" }),
                MockApiData.taskData({ is_completed: true, uuid: "2" }),
                MockApiData.taskData({ is_completed: false, uuid: "3" }),
            ]
        }
        return Object.assign(apiData, dataObject);
    },
    eventData: (dataObject) => {
        let apiData = {
            client_uuid: "cc14121c-ff53-4edb-832b-8adda60cb372",
            event_name: "Engagement",
            package_uuid: "654a66f1-055f-4525-906e-9334e28b1966",
            shoot_date: "2020-04-17T14:00:00Z",
            uuid: "55555cce2-0d61-4fb9-8caa-058fc62c73ca",
            blog_link: "http://google.com",
            coordinator_name: null,
            edit_image_deadline: "2020-04-17T14:00:00Z",
            gallery_link: "http://google.com",
            notes: "Have clients bring extra flowers and a see through chair.",
            reception_location: null,
            shoot_location: "Los Angeles Poppy Fields",
            shoot_time: "6AM - 11AM",
            wedding_location: null
        }
        return Object.assign(apiData, dataObject);
    },
    weddingEventData: (dataObject) => {
        let apiData = {
            client_uuid: "cc14121c-ff53-4edb-832b-8adda60cb372",
            event_name: "Wedding",
            package_uuid: "654a66f1-055f-4525-906e-9334e28b1966",
            shoot_date: "2020-08-17T14:00:00Z",
            uuid: "6607cce2-0d61-4fb9-8caa-058fc62c73ca",
            blog_link: "http://google.com",
            coordinator_name: "Cindy, 111-111-1111",
            edit_image_deadline: "2020-04-17T14:00:00Z",
            gallery_link: "http://google.com",
            notes: "Coordinate with Cindy on exact time details for bride prep",
            reception_location: "Redbird DTLA",
            shoot_location: null,
            shoot_time: "8AM - 11PM",
            wedding_location: "Viviana DTLA"
        }
        return Object.assign(apiData, dataObject);
    },
    packageData: (dataObject) => {
        let apiData = {
            client_uuid: "cc14121c-ff53-4edb-832b-8adda60cb372",
            package_events: [
                MockApiData.eventData(),
                MockApiData.weddingEventData()
            ],
            package_name: "Wedding Premier",
            proposal_signed: false,
            package_contents: `
                Up To Eight Hours of Photographic Coverage
                
                Handcrafted 10x10 Thirty Sided Artisan Album
                
                Complimentary Engagement Session
                
                Private Online Gallery of All Images for Friends and Family
                
                Five Hundred+ Digital Negatives on a Custom USB Drive`,
            package_price: 480000,
            retainer_price: 100000,
            retainer_paid_amount: 0,
            retainer_paid: false,
            discount_offered: 0,
            balance_remaining: 480000,
            balance_received: false,
            engagement_included: false,
            wedding_included: false,
            uuid: "654a66f1-055f-4525-906e-9334e28b1966",
            upcoming_shoot_date: "2020-04-17T14:00:00Z",
        }
        return Object.assign(apiData, dataObject);
    },
    allClientData: (dataObject) => {
        let apiData = {
            contacts: [
                MockApiData.contactData({ first_name: "Sammy" }),
            ],
            private_notes: null,
            user_uuid: "user_uuid",
            uuid: "cc14121c-ff53-4edb-832b-8adda60cb372",
            current_stage: {
                category: "New Client Inquiry",
                client_uuid: "cc14121c-ff53-4edb-832b-8adda60cb372",
                event_uuid: "6607cce2-0d61-4fb9-8caa-058fc62c73ca",
                is_completed: false,
                step: "Request More Information",
                uuid: "fe71fd1a-32a5-497c-b480-a510bf94bace"
            },
            package: MockApiData.packageData(),
            workflows: [MockApiData.workflowData()]
        };
        return Object.assign(apiData, dataObject);
    },
    successfulClient: (dataObject) => {
        let apiData = MockApiData.allClientData(dataObject);
        return successResult(apiData);
    },
    partialClientData: (dataObject) => {
        let apiData = {
            client_first_name: "Natasha",
            current_stage: {
                category: "New Client Inquiry",
                client_uuid: "cc14121c-ff53-4edb-832b-8adda60cb372",
                event_uuid: "6607cce2-0d61-4fb9-8caa-058fc62c73ca",
                is_completed: false,
                step: "Request More Information",
                uuid: "fe71fd1a-32a5-497c-b480-a510bf94bace"
            },
            package_name: "Wedding Premier",
            partner_first_name: "Zihao",
            upcoming_shoot_date: "2020-04-17T14:00:00Z",
            uuid: "ce20b995-0368-4a59-9ae4-ad858b77f8af"
        };
        return Object.assign(apiData, dataObject);
    },
}

export default MockApiData;