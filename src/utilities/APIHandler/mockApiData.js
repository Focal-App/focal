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
    successfulLoginData: (dataObject) => {
        let apiData = {
            "avatar": "avatar-image-link",
            "email": "email",
            "first_name": "test-user",
            "provider": "google",
            "uuid": "1234"
        }
        apiData = Object.assign(apiData, dataObject);
        return successResult(apiData);
    },
}

export default MockApiData;