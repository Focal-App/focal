import DataAdapter from "utilities/APIHandler/dataAdapter";

describe("Data Adapter", () => {
    it("maps user API object to a UserModel", () => {
        let apiUserData = {
            "avatar": "https://lh3.googleusercontent.com/a-/AAuE7mD7LlB9v9x4X7ZGPwE2JYIYmAaVtGY3A2o4WuPqXMY",
            "email": "littlegangwolf@gmail.com",
            "first_name": "francesca",
            "provider": "google",
            "uuid": "6602aa08-765f-4197-9237-b69da4ca496f"
        }
        const userModel = DataAdapter.toUserModel(apiUserData);

        expect(userModel).toEqual({
            avatar: "https://lh3.googleusercontent.com/a-/AAuE7mD7LlB9v9x4X7ZGPwE2JYIYmAaVtGY3A2o4WuPqXMY",
            email: "littlegangwolf@gmail.com",
            first_name: "francesca",
            uuid: "6602aa08-765f-4197-9237-b69da4ca496f"
        })
    })

    it("maps client API data to a ClientModel", () => {
        let apiClientData = {
            "client_name": "Natasha & Zihao",
            "user_uuid": "6602aa08-765f-4197-9237-b69da4ca496f",
            "uuid": "cc14121c-ff53-4edb-832b-8adda60cb372"
        }

        const clientModel = DataAdapter.toClientModel(apiClientData);

        expect(clientModel).toEqual({
            client_name: "Natasha & Zihao",
            uuid: "cc14121c-ff53-4edb-832b-8adda60cb372"
        })
    })

    it("maps current stage API data to a TaskModel", () => {
        let apiCurrentStageData = {
            "category": "New Client Inquiry",
            "client_uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
            "event_uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca",
            "is_completed": false,
            "step": "Request More Information",
            "uuid": "fe71fd1a-32a5-497c-b480-a510bf94bace"
        }

        const currentStageModel = DataAdapter.toTaskModel(apiCurrentStageData);

        expect(currentStageModel).toEqual({
            "category": "New Client Inquiry",
            "is_completed": false,
            "step": "Request More Information",
            "uuid": "fe71fd1a-32a5-497c-b480-a510bf94bace"
        })
    })
    
    it("maps Event API data to a EventModel", () => {
        let apiEventData = {
            "client_uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
            "event_name": "Engagement",
            "package_uuid": "654a66f1-055f-4525-906e-9334e28b1966",
            "shoot_date": "2020-04-17T14:00:00Z",
            "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
        }

        const eventModel = DataAdapter.toEventModel(apiEventData);

        expect(eventModel).toEqual({
            "event_name": "Engagement",
            "package_uuid": "654a66f1-055f-4525-906e-9334e28b1966",
            "shoot_date": "April 17, 2020",
            "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
        })
    })

    it("maps package API data to a PackageModel", () => {
        let apiPackageData = {
            "client_uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
            "package_events": [
                {
                    "client_uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
                    "event_name": "Engagement",
                    "package_uuid": "654a66f1-055f-4525-906e-9334e28b1966",
                    "shoot_date": "2020-04-17T14:00:00Z",
                    "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
                },
                {
                    "client_uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
                    "event_name": "Wedding",
                    "package_uuid": "654a66f1-055f-4525-906e-9334e28b1966",
                    "shoot_date": "2020-04-17T14:00:00Z",
                    "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
                }
            ],
            "package_name": "Wedding Premier",
            "uuid": "654a66f1-055f-4525-906e-9334e28b1966"
        }

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
        let apiUserClientsData = [{
            "client_name": "Natasha & Zihao",
            "current_stage": {
                "category": "New Client Inquiry",
                "client_uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
                "event_uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca",
                "is_completed": false,
                "step": "Request More Information",
                "uuid": "fe71fd1a-32a5-497c-b480-a510bf94bace"
            },
            "package": {
                "client_uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
                "package_events": [
                    {
                        "client_uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
                        "event_name": "Engagement",
                        "package_uuid": "654a66f1-055f-4525-906e-9334e28b1966",
                        "shoot_date": "2020-04-17T14:00:00Z",
                        "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
                    }
                ],
                "package_name": "Wedding Premier",
                "uuid": "654a66f1-055f-4525-906e-9334e28b1966"
            },
            "user_uuid": "6602aa08-765f-4197-9237-b69da4ca496f",
            "uuid": "cc14121c-ff53-4edb-832b-8adda60cb372"
        },
        {
            "client_name": "Andrew & Diane",
            "current_stage": {
                "category": "Proposal & Retainer",
                "client_uuid": "97e1abf1-085a-4226-9530-b984f61f3f13",
                "event_uuid": "40394e9e-5601-422b-ac17-c426e6ea9088",
                "is_completed": false,
                "step": "Confirm Proposal & Retainer",
                "uuid": "8a53f79a-55a3-4a92-997d-8abef5e5c8a3"
            },
            "package": {
                "client_uuid": "97e1abf1-085a-4226-9530-b984f61f3f13",
                "package_events": [
                    {
                        "client_uuid": "97e1abf1-085a-4226-9530-b984f61f3f13",
                        "event_name": "Engagement",
                        "package_uuid": "23901a9f-6667-4387-a79b-9a7337e582f5",
                        "shoot_date": "2020-04-17T14:00:00Z",
                        "uuid": "40394e9e-5601-422b-ac17-c426e6ea9088"
                    }
                ],
                "package_name": "Wedding Classic",
                "uuid": "23901a9f-6667-4387-a79b-9a7337e582f5"
            },
            "user_uuid": "6602aa08-765f-4197-9237-b69da4ca496f",
            "uuid": "97e1abf1-085a-4226-9530-b984f61f3f13"
        }]
        const allClientDataModel = DataAdapter.toAllClientDataModel(apiUserClientsData);

        expect(allClientDataModel).toEqual([{
            client: {
                "client_name": "Natasha & Zihao",
                "uuid": "cc14121c-ff53-4edb-832b-8adda60cb372"
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
                        "shoot_date": "April 17, 2020",
                        "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
                    }
                ],
                "package_name": "Wedding Premier",
                "uuid": "654a66f1-055f-4525-906e-9334e28b1966",
                "upcoming_shoot_date": "April 17, 2020"
            },
        },
        {
            client: {
                "client_name": "Andrew & Diane",
                "uuid": "97e1abf1-085a-4226-9530-b984f61f3f13"
            },
            "current_stage": {
                "category": "Proposal & Retainer",
                "is_completed": false,
                "step": "Confirm Proposal & Retainer",
                "uuid": "8a53f79a-55a3-4a92-997d-8abef5e5c8a3"
            },
            "package": {
                "package_events": [
                    {
                        "event_name": "Engagement",
                        "package_uuid": "23901a9f-6667-4387-a79b-9a7337e582f5",
                        "shoot_date": "April 17, 2020",
                        "uuid": "40394e9e-5601-422b-ac17-c426e6ea9088"
                    }
                ],
                "package_name": "Wedding Classic",
                "uuid": "23901a9f-6667-4387-a79b-9a7337e582f5",
                "upcoming_shoot_date": "April 17, 2020"
            }
        }])
    })
})