class MockAPIHandler {
    constructor(data) {
        this.data = data;
    }

    get = async (endpoint) => {
        let resolvedData = this.setResolvedDataFor(endpoint)
        return Promise.resolve(resolvedData);
    }

    post = async (endpoint, data) => {
        let resolvedData = this.setResolvedDataFor(endpoint)
        return Promise.resolve(resolvedData);
    }
    
    setResolvedDataFor = (endpoint) => {
        let endpointData = this.data[endpoint];
        if (endpointData) {
            const resolvedData = endpointData[0];
            if (endpointData.length > 1) {
                endpointData.shift()
            } 
            return resolvedData.errors ? resolvedData : resolvedData.data;
        } else {
            return `Missing mock data for ${endpoint}.`;
        }
    }
}

export default MockAPIHandler;