class MockAPIHandler {
    constructor(data) {
        this.data = data;
        this.resolvedData = this.setResolvedData();
    }

    get = async (endpoint) => {
        return Promise.resolve(this.resolvedData);
    }
    
    setResolvedData = () => {
        if (this.data) {
            return this.data.errors ? this.data : this.data.data;
        } else {
            return true;
        }

    }
}

export default MockAPIHandler;