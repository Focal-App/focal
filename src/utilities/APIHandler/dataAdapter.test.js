import DataAdapter from "utilities/APIHandler/dataAdapter";
import MockApiData from "utilities/APIHandler/mockApiData";

describe("Data Adapter", () => {
    it("maps user API object to a UserModel", () => {
        const apiUserData = MockApiData.userData()
        const userModel = DataAdapter.toUserModel(apiUserData);

        expect(userModel).toEqual({
            "avatar": "avatar-image-link",
            "email": "email",
            "first_name": "test-user",
            "uuid": "1234"
        })
    })

    it("maps client API data to a ClientModel", () => {
        const apiClientData = MockApiData.clientData()
        const clientModel = DataAdapter.toClientModel(apiClientData);

        expect(clientModel).toEqual({
            contacts: [
                {
                    "first_name": "Natasha",
                    "last_name": "Lee",
                    "email": "client@gmail.com",
                    "phone_number": "123-456-7890",
                    "label": "Bride",
                    "best_time_to_contact": "Evening",
                    "uuid": "cc14121c-ff53-4edb-832b-8adda60cb372"
                },
                {
                    "first_name": "-",
                    "last_name": "-",
                    "email": "-",
                    "phone_number": "-",
                    "label": "-",
                    "best_time_to_contact": "-",
                }
            ],
            "private_notes": "-",
            uuid: "cc14121c-ff53-4edb-832b-8adda60cb372"
        })
    })

    it("maps current stage API data to a TaskModel", () => {
        const apiCurrentStageData = MockApiData.taskData()
        const currentStageModel = DataAdapter.toTaskModel(apiCurrentStageData);

        expect(currentStageModel).toEqual({
            "category": "New Client Inquiry",
            "is_completed": false,
            "step": "Request More Information",
            "uuid": "fe71fd1a-32a5-497c-b480-a510bf94bace"
        })
    })

    it("maps Event API data to a EventModel", () => {
        let apiEventData = MockApiData.eventData()
        const eventModel = DataAdapter.toEventModel(apiEventData);

        expect(eventModel).toEqual({
            "event_name": "Engagement",
            "package_uuid": "654a66f1-055f-4525-906e-9334e28b1966",
            "shoot_date": "April 17, 2020",
            "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
        })
    })

    it("maps package API data to a PackageModel", () => {
        const apiPackageData = MockApiData.packageData()
        const packageModel = DataAdapter.toPackageModel(apiPackageData);

        expect(packageModel).toEqual({
            "package_name": "Wedding Premier",
            "uuid": "654a66f1-055f-4525-906e-9334e28b1966",
            "upcoming_shoot_date": "April 17, 2020"
        })
    })

    it("maps user clients API object to an array of AllClientDataModel", () => {
        const apiUserClientsData = [MockApiData.allClientData()]
        const allClientDataModel = DataAdapter.toAllClientDataModel(apiUserClientsData);

        expect(allClientDataModel).toEqual([{
            client: {
                "uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
                "private_notes": "-",
                contacts: [
                    {
                        "first_name": "Sammy",
                        "last_name": "Lee",
                        "email": "client@gmail.com",
                        "phone_number": "123-456-7890",
                        "label": "Bride",
                        "best_time_to_contact": "Evening",
                        "uuid": "cc14121c-ff53-4edb-832b-8adda60cb372"
                    },
                    {
                        "first_name": "-",
                        "last_name": "-",
                        "email": "-",
                        "phone_number": "-",
                        "label": "-",
                        "best_time_to_contact": "-",
                        "uuid": undefined,
                    }
                ]
            },
            "current_stage": {
                "category": "New Client Inquiry",
                "is_completed": false,
                "step": "Request More Information",
                "uuid": "fe71fd1a-32a5-497c-b480-a510bf94bace"
            },
            "package": {
                "package_name": "Wedding Premier",
                "uuid": "654a66f1-055f-4525-906e-9334e28b1966",
                "upcoming_shoot_date": "July 17, 2020"
            },
            "events": {
                "Engagement": {
                    "event_name": "Engagement",
                    "package_uuid": "654a66f1-055f-4525-906e-9334e28b1966",
                    "shoot_date": "July 17, 2020",
                    "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
                }
            }
        }])
    })

    it("maps user clients API object to an array of AllClientPartialDataModel", () => {
        const apiUserClientsData = [MockApiData.partialClientData()]
        const allClientPartialDataModel = DataAdapter.toAllClientPartialDataModel(apiUserClientsData);

        expect(allClientPartialDataModel).toEqual([
            {
                "client_first_name": "Natasha",
                "current_stage": {
                    "category": "New Client Inquiry",
                    "is_completed": false,
                    "step": "Request More Information",
                    "uuid": "fe71fd1a-32a5-497c-b480-a510bf94bace",
                },
                "package_name": "Wedding Premier",
                "partner_first_name": "Zihao",
                "upcoming_shoot_date": "April 17, 2020",
                "uuid": "ce20b995-0368-4a59-9ae4-ad858b77f8af",
            }
        ])
    })
})