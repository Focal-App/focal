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
            client_first_name: "Natasha & Zihao",
            "client_last_name": "-",
            "client_email": "-",
            "client_phone_number": "-",
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
            "package_events": [
                {
                    "event_name": "Engagement",
                    "package_uuid": "654a66f1-055f-4525-906e-9334e28b1966",
                    "shoot_date": "April 17, 2020",
                    "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
                },
                {
                    "event_name": "Wedding",
                    "package_uuid": "654a66f1-055f-4525-906e-9334e28b1966",
                    "shoot_date": "April 17, 2020",
                    "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
                }
            ],
            "package_name": "Wedding Premier",
            "uuid": "654a66f1-055f-4525-906e-9334e28b1966",
            "upcoming_shoot_date": "April 17, 2020"
        })
    })

    it("maps user clients API object to an array of AllClientDataModel", () => {
        const apiUserClientsData = [MockApiData.allClientData({ "client_first_name": "Natasha & Zihao" })]
        const allClientDataModel = DataAdapter.toAllClientDataModel(apiUserClientsData);

        expect(allClientDataModel).toEqual([{
            client: {
                "client_first_name": "Natasha & Zihao",
                "uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
                "client_last_name": "-",
                "client_email": "-",
                "client_phone_number": "-",
                "private_notes": "-",
            },
            "current_stage": {
                "category": "New Client Inquiry",
                "is_completed": false,
                "step": "Request More Information",
                "uuid": "fe71fd1a-32a5-497c-b480-a510bf94bace"
            },
            "package": {
                "package_events": [
                    {
                        "event_name": "Engagement",
                        "package_uuid": "654a66f1-055f-4525-906e-9334e28b1966",
                        "shoot_date": "July 17, 2020",
                        "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
                    }
                ],
                "package_name": "Wedding Premier",
                "uuid": "654a66f1-055f-4525-906e-9334e28b1966",
                "upcoming_shoot_date": "July 17, 2020"
            },
        }])
    })
})