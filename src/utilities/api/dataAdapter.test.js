import DataAdapter from "utilities/api/dataAdapter";
import MockApiData from "utilities/api/mockApiData";

describe("Data Adapter", () => {
    it("maps user API object to a UserModel", () => {
        const apiUserData = MockApiData.userData()
        const userModel = DataAdapter.toUserModel(apiUserData);

        expect(userModel).toEqual({
            avatar: "avatar-image-link",
            email: "email",
            first_name: "test-user",
            uuid: "1234"
        })
    })

    it("maps client API data to a ClientModel", () => {
        const apiClientData = MockApiData.clientData()
        const clientModel = DataAdapter.toClientModel(apiClientData);

        expect(clientModel).toEqual({
            contacts: [
                {
                    first_name: "Natasha",
                    last_name: "Lee",
                    email: "client@gmail.com",
                    phone_number: "123-456-7890",
                    label: "Bride",
                    best_time_to_contact: "Evening",
                    uuid: "cc14121c-ff53-4edb-832b-8adda60cb372"
                },
                {
                    first_name: "-",
                    last_name: "-",
                    email: "-",
                    phone_number: "-",
                    label: "-",
                    best_time_to_contact: "-",
                }
            ],
            private_notes: "-",
            uuid: "cc14121c-ff53-4edb-832b-8adda60cb372"
        })
    })

    it("maps current stage API data to a TaskModel", () => {
        const apiCurrentStageData = MockApiData.taskData()
        const currentStageModel = DataAdapter.toTaskModel(apiCurrentStageData);

        expect(currentStageModel).toEqual({
            category: "New Client Inquiry",
            is_completed: false,
            step: "Request More Information",
            uuid: "fe71fd1a-32a5-497c-b480-a510bf94bace"
        })
    })

    it("maps workflow API data to a WorkflowModel", () => {
        const apiWorkflowData = MockApiData.workflowData()
        const workflowModel = DataAdapter.toWorkflowModel(apiWorkflowData);

        expect(workflowModel).toEqual({
            order: 0,
            uuid: "6f524831-fa75-42c8-9a7c-f8ecad3a721b",
            workflow_name: "New Client Inquiry",
            completed_tasks: 1,
            incomplete_tasks: 2,
            tasks: [
                {
                    category: "New Client Inquiry",
                    is_completed: false,
                    step: "Request More Information",
                    uuid: "1"
                },
                {
                    category: "New Client Inquiry",
                    is_completed: true,
                    step: "Request More Information",
                    uuid: "2"
                },
                {
                    category: "New Client Inquiry",
                    is_completed: false,
                    step: "Request More Information",
                    uuid: "3"
                },
            ]
        })
    })

    it("maps Event API data to a EventModel", () => {
        let apiEventData = MockApiData.eventData()
        const eventModel = DataAdapter.toEventModel(apiEventData);

        expect(eventModel).toEqual({
            event_name: "Engagement",
            package_uuid: "654a66f1-055f-4525-906e-9334e28b1966",
            shoot_date: "April 17, 2020",
            uuid: "55555cce2-0d61-4fb9-8caa-058fc62c73ca",
            blog_link: "http://google.com",
            edit_image_deadline: "April 17, 2020",
            gallery_link: "http://google.com",
            notes: "Have clients bring extra flowers and a see through chair.",
            shoot_location: "Los Angeles Poppy Fields",
            shoot_time: "6AM - 11AM",
        })
    })

    it("maps Event API data to a WeddingEventModel", () => {
        let apiEventData = MockApiData.weddingEventData()
        const weddingEventModel = DataAdapter.toEventModel(apiEventData);

        expect(weddingEventModel).toEqual({
            event_name: "Wedding",
            package_uuid: "654a66f1-055f-4525-906e-9334e28b1966",
            shoot_date: "August 17, 2020",
            uuid: "6607cce2-0d61-4fb9-8caa-058fc62c73ca",
            blog_link: "http://google.com",
            coordinator_name: "Cindy, 111-111-1111",
            edit_image_deadline: "April 17, 2020",
            gallery_link: "http://google.com",
            notes: "Coordinate with Cindy on exact time details for bride prep",
            reception_location: "Redbird DTLA",
            shoot_time: "8AM - 11PM",
            wedding_location: "Viviana DTLA",
        })
    })

    it("maps package API data to a PackageModel", () => {
        const apiPackageData = MockApiData.packageData()
        const packageModel = DataAdapter.toPackageModel(apiPackageData);

        expect(packageModel).toEqual({
            package_name: "Wedding Premier",
            uuid: "654a66f1-055f-4525-906e-9334e28b1966",
            upcoming_shoot_date: "April 17, 2020",
            balance_received: false,
            balance_remaining: "4800.00",
            discount_offered: "0.00",
            package_contents: `
                Up To Eight Hours of Photographic Coverage
                
                Handcrafted 10x10 Thirty Sided Artisan Album
                
                Complimentary Engagement Session
                
                Private Online Gallery of All Images for Friends and Family
                
                Five Hundred+ Digital Negatives on a Custom USB Drive`,
            package_price: "4800.00",
            proposal_signed: false,
            retainer_paid: false,
            retainer_paid_amount: "0.00",
            retainer_price: "1000.00",
            engagement_included: false,
            wedding_included: false
        })
    })

    it("maps user clients API object to an array of AllClientDataModel", () => {
        const apiUserClientsData = [MockApiData.allClientData()]
        const allClientDataModel = DataAdapter.toAllClientDataModel(apiUserClientsData);

        expect(allClientDataModel).toEqual([{
            client: {
                uuid: "cc14121c-ff53-4edb-832b-8adda60cb372",
                private_notes: "-",
                contacts: [
                    {
                        first_name: "Sammy",
                        last_name: "Lee",
                        email: "client@gmail.com",
                        phone_number: "123-456-7890",
                        label: "Bride",
                        best_time_to_contact: "Evening",
                        uuid: "cc14121c-ff53-4edb-832b-8adda60cb372"
                    },
                    {
                        first_name: "-",
                        last_name: "-",
                        email: "-",
                        phone_number: "-",
                        label: "-",
                        best_time_to_contact: "-",
                        uuid: undefined,
                    }
                ]
            },
            current_stage: {
                category: "New Client Inquiry",
                is_completed: false,
                step: "Request More Information",
                uuid: "fe71fd1a-32a5-497c-b480-a510bf94bace"
            },
            package: {
                package_name: "Wedding Premier",
                uuid: "654a66f1-055f-4525-906e-9334e28b1966",
                upcoming_shoot_date: "April 17, 2020",
                balance_received: false,
                balance_remaining: "4800.00",
                discount_offered: "0.00",
                package_contents: `
                Up To Eight Hours of Photographic Coverage
                
                Handcrafted 10x10 Thirty Sided Artisan Album
                
                Complimentary Engagement Session
                
                Private Online Gallery of All Images for Friends and Family
                
                Five Hundred+ Digital Negatives on a Custom USB Drive`,
                package_price: "4800.00",
                proposal_signed: false,
                retainer_paid: false,
                retainer_paid_amount: "0.00",
                retainer_price: "1000.00",
                engagement_included: false,
                wedding_included: false
            },
            events: [
                {
                    event_name: "Engagement",
                    package_uuid: "654a66f1-055f-4525-906e-9334e28b1966",
                    shoot_date: "April 17, 2020",
                    uuid: "55555cce2-0d61-4fb9-8caa-058fc62c73ca",
                    blog_link: "http://google.com",
                    edit_image_deadline: "April 17, 2020",
                    gallery_link: "http://google.com",
                    notes: "Have clients bring extra flowers and a see through chair.",
                    shoot_location: "Los Angeles Poppy Fields",
                    shoot_time: "6AM - 11AM",
                },
                {
                    event_name: "Wedding",
                    package_uuid: "654a66f1-055f-4525-906e-9334e28b1966",
                    shoot_date: "August 17, 2020",
                    uuid: "6607cce2-0d61-4fb9-8caa-058fc62c73ca",
                    blog_link: "http://google.com",
                    coordinator_name: "Cindy, 111-111-1111",
                    edit_image_deadline: "April 17, 2020",
                    gallery_link: "http://google.com",
                    notes: "Coordinate with Cindy on exact time details for bride prep",
                    reception_location: "Redbird DTLA",
                    shoot_time: "8AM - 11PM",
                    wedding_location: "Viviana DTLA",
                }
            ],
            workflows: [
                {
                    order: 0,
                    uuid: "6f524831-fa75-42c8-9a7c-f8ecad3a721b",
                    workflow_name: "New Client Inquiry",
                    completed_tasks: 1,
                    incomplete_tasks: 2,
                    tasks: [
                        {
                            category: "New Client Inquiry",
                            is_completed: false,
                            step: "Request More Information",
                            uuid: "1"
                        },
                        {
                            category: "New Client Inquiry",
                            is_completed: true,
                            step: "Request More Information",
                            uuid: "2"
                        },
                        {
                            category: "New Client Inquiry",
                            is_completed: false,
                            step: "Request More Information",
                            uuid: "3"
                        },
                    ]
                }
            ]
        }])
    })

    it("maps user clients API object to an array of AllClientPartialDataModel", () => {
        const apiUserClientsData = [MockApiData.partialClientData()]
        const allClientPartialDataModel = DataAdapter.toAllClientPartialDataModel(apiUserClientsData);

        expect(allClientPartialDataModel).toEqual([
            {
                client_first_name: "Natasha",
                current_stage: {
                    category: "New Client Inquiry",
                    is_completed: false,
                    step: "Request More Information",
                    uuid: "fe71fd1a-32a5-497c-b480-a510bf94bace",
                },
                package_name: "Wedding Premier",
                partner_first_name: "Zihao",
                upcoming_shoot_date: "April 17, 2020",
                uuid: "ce20b995-0368-4a59-9ae4-ad858b77f8af",
            }
        ])
    })

    it("prepares data for API", () => {
        const dataToSendToApi = {
            firstName: "-",
            lastName: "",
            price: "1.00",
            zeroPrice: "0.00",
            text: "a 11 story thing",
            isTrue: true,
            simpleDate: "2019-07-01",
            formattedDate: "April 17, 2019",
            undefined: undefined,
            array: [
                {
                    firstName: "-",
                    lastName: "",
                    price: "1.00",
                    zeroPrice: "0.00",
                    text: "a 11 story thing",
                    isTrue: true,
                    simpleDate: "2019-07-01",
                    formattedDate: "April 17, 2019",
                }
            ],
            object: {
                firstName: "-",
                lastName: "",
                price: "1.00",
                zeroPrice: "0.00",
                text: "a 11 story thing",
                isTrue: true,
                simpleDate: "2019-07-01",
                formattedDate: "April 17, 2019",
            }
        }

        expect(DataAdapter.toApiReadyClient(dataToSendToApi)).toEqual({
            firstName: null,
            lastName: null,
            price: 100,
            zeroPrice: 0,
            text: "a 11 story thing",
            isTrue: true,
            simpleDate: "2019-07-01T07:00:00.000Z",
            formattedDate: "2019-04-17T07:00:00.000Z",
            undefined: null,
            array: [
                {
                    firstName: null,
                    lastName: null,
                    price: 100,
                    zeroPrice: 0,
                    text: "a 11 story thing",
                    isTrue: true,
                    simpleDate: "2019-07-01T07:00:00.000Z",
                    formattedDate: "2019-04-17T07:00:00.000Z",
                }
            ],
            object: {
                firstName: null,
                lastName: null,
                price: 100,
                zeroPrice: 0,
                text: "a 11 story thing",
                isTrue: true,
                simpleDate: "2019-07-01T07:00:00.000Z",
                formattedDate: "2019-04-17T07:00:00.000Z",
            }
        })

        expect(dataToSendToApi).toEqual({
            firstName: "-",
            lastName: "",
            price: "1.00",
            zeroPrice: "0.00",
            text: "a 11 story thing",
            isTrue: true,
            simpleDate: "2019-07-01",
            formattedDate: "April 17, 2019",
            array: [
                {
                    firstName: "-",
                    lastName: "",
                    price: "1.00",
                    zeroPrice: "0.00",
                    text: "a 11 story thing",
                    isTrue: true,
                    simpleDate: "2019-07-01",
                    formattedDate: "April 17, 2019",
                }
            ],
            object: {
                firstName: "-",
                lastName: "",
                price: "1.00",
                zeroPrice: "0.00",
                text: "a 11 story thing",
                isTrue: true,
                simpleDate: "2019-07-01",
                formattedDate: "April 17, 2019",
            }
        })
    })

    it("prepares data for Forms", () => {
        const dataForForms = {
            firstName: "-",
            lastName: "",
            price: "1.00",
            zeroPrice: "0.00",
            text: "a 11 story thing",
            isTrue: true,
            formattedDate: "April 17, 2019",
            array: [
                {
                    firstName: "-",
                    lastName: "",
                    price: "1.00",
                    text: "a 11 story thing",
                    isTrue: true,
                    formattedDate: "April 17, 2019",
                }
            ],
            object: {
                firstName: "-",
                lastName: "",
                price: "1.00",
                text: "a 11 story thing",
                isTrue: true,
                formattedDate: "April 17, 2019",
            }
        }

        expect(DataAdapter.toFormReadyData(dataForForms)).toEqual({
            firstName: '',
            lastName: '',
            price: "1.00",
            zeroPrice: "0.00",
            text: "a 11 story thing",
            isTrue: true,
            formattedDate: "2019-04-17",
            array: [
                {
                    firstName: '',
                    lastName: '',
                    price: "1.00",
                    text: "a 11 story thing",
                    isTrue: true,
                    formattedDate: "2019-04-17",
                }
            ],
            object: {
                firstName: '',
                lastName: '',
                price: "1.00",
                text: "a 11 story thing",
                isTrue: true,
                formattedDate: "2019-04-17",
            }
        })

        expect(dataForForms).toEqual({
            firstName: "-",
            lastName: "",
            price: "1.00",
            zeroPrice: "0.00",
            text: "a 11 story thing",
            isTrue: true,
            formattedDate: "April 17, 2019",
            array: [
                {
                    firstName: "-",
                    lastName: "",
                    price: "1.00",
                    text: "a 11 story thing",
                    isTrue: true,
                    formattedDate: "April 17, 2019",
                }
            ],
            object: {
                firstName: "-",
                lastName: "",
                price: "1.00",
                text: "a 11 story thing",
                isTrue: true,
                formattedDate: "April 17, 2019",
            }
        })
    })
})