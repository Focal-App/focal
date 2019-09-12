import MockAPIHandler from 'utilities/APIHandler/mockApiHandler';

test('APIHandler can make a mock get call', async () => {
    const itemData = {
        "data": {
            "data": [
                { "id": 1 },
                { "id": 2 },
                { "id": 3 },
            ]
        }
    };

    const apiHandler = new MockAPIHandler(itemData);
    const url = '/api/users';
    const fetchResult = await apiHandler.get(url);

    expect.assertions(1);
    expect(fetchResult).toEqual(itemData.data)
})

test('APIHandler can handle a mock get call that returns an error', async () => {
    const error = {
        "data": {
            "errors": {
                "message": "Invalid fetch"
            }
        }
    };
    const apiHandler = new MockAPIHandler(error);
    const url = '/api/users';
    const fetchResult = await apiHandler.get(url);

    expect.assertions(1);
    expect(fetchResult).toEqual(error.data)
})