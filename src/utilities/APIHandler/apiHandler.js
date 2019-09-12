import API_URL from 'utilities/apiEndpoint';
const axios = require('axios');

class APIHandler {
    get = async (endpoint) => {
        return axios.get(API_URL + endpoint, {
            withCredentials: true
        })
        .then(response => response.data)
        .catch(error => this.formatError(error));
    }

    formatError = (error) => {
        if (!error.response) {
            return { errors: error };
        } else if (error.response.data.errors) {
            return error.response.data;
        } else {
            return {
                errors: {
                    [error.response.status]: error.response.statusText
                }
            }
        }
    }
}

export default APIHandler;