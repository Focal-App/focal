const successResult = (data = {}) => {
    return {
        "data": {
            "data": data
        }
    }
}

const errorResult = (errors = []) => {
    return {
        "data": {
            "errors": errors
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
            "avatar": "avatar-image-link",
            "email": "email",
            "first_name": "test-user",
            "provider": "google",
            "uuid": "1234"
        }
        return Object.assign(apiData, dataObject);
    },
    successfulLoginData: (dataObject) => {
        let apiData = MockApiData.userData(dataObject);
        return successResult(apiData);
    },
    clientData: (dataObject) => {
        let apiData = {
            "client_first_name": "Natasha & Zihao",
            "client_last_name": null,
            "client_email": null,
            "client_phone_number": null,
            "private_notes": null,
            "user_uuid": "6602aa08-765f-4197-9237-b69da4ca496f",
            "uuid": "cc14121c-ff53-4edb-832b-8adda60cb372"
        }
        return Object.assign(apiData, dataObject);
    },
    taskData: (dataObject) => {
        let apiData = {
            "category": "New Client Inquiry",
            "client_uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
            "event_uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca",
            "is_completed": false,
            "step": "Request More Information",
            "uuid": "fe71fd1a-32a5-497c-b480-a510bf94bace"
        }
        return Object.assign(apiData, dataObject);
    },
    eventData: (dataObject) => {
        let apiData = {
            "client_uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
            "event_name": "Engagement",
            "package_uuid": "654a66f1-055f-4525-906e-9334e28b1966",
            "shoot_date": "2020-04-17T14:00:00Z",
            "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
        }
        return Object.assign(apiData, dataObject);
    },
    packageData: (dataObject) => {
        let apiData = {
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
        return Object.assign(apiData, dataObject);
    },
    allClientData: (dataObject) => {
        let apiData = {
            "client_first_name": "Sammy & David",
            "client_last_name": null,
            "client_email": null,
            "client_phone_number": null,
            "private_notes": null,
            "user_uuid": "user_uuid",
            "uuid": "cc14121c-ff53-4edb-832b-8adda60cb372",
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
                        "shoot_date": "2020-07-17T16:53:52Z",
                        "uuid": "6607cce2-0d61-4fb9-8caa-058fc62c73ca"
                    }
                ],
                "package_name": "Wedding Premier",
                "uuid": "654a66f1-055f-4525-906e-9334e28b1966"
            },
        };
        return Object.assign(apiData, dataObject);
    },
    successfulClient: (dataObject) => {
        let apiData = MockApiData.allClientData(dataObject);
        return successResult(apiData);
    }
}

export default MockApiData;