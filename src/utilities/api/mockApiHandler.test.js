import MockAPIHandler from 'utilities/api/mockApiHandler';

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

    const url = '/api/users';
    const apiHandler = new MockAPIHandler({ [url]: [itemData] });
    const fetchResult = await apiHandler.get(url);

    expect.assertions(1);
    expect(fetchResult).toEqual(itemData.data)
})

test('APIHandler can make subsequent get calls and return 2 different responses', async () => {
    const url1 = '/api/items';
    const itemData1 = {
        "data": {
            "data": [
                { "id": 1 },
                { "id": 2 },
                { "id": 3 },
            ]
        }
    };

    const url2 = '/api/users';
    const itemData2 = {
        "data": {
            "user": "Tommy"
        }
    };

    const apiHandler = new MockAPIHandler({
        [url1]: [itemData1],
        [url2]: [itemData2]
    });

    const fetchResult1 = await apiHandler.get(url1);
    const fetchResult2 = await apiHandler.get(url2);

    expect(fetchResult1).toEqual(itemData1.data)
    expect(fetchResult2).toEqual(itemData2.data)
})

test('APIHandler can make subsequent get calls to the same endpoint and return 2 different responses', async () => {
    const url1 = '/api/items';
    const itemData1 = {
        "data": {
            "data": [
                { "id": 1 },
                { "id": 2 },
                { "id": 3 },
            ]
        }
    };
    const itemData2 = {
        "data": {
            "user": "Tommy"
        }
    };

    const apiHandler = new MockAPIHandler({
        [url1]: [itemData1, itemData2],
    });

    const fetchResult1 = await apiHandler.get(url1);
    const fetchResult2 = await apiHandler.get(url1);

    expect(fetchResult1).toEqual(itemData1.data)
    expect(fetchResult2).toEqual(itemData2.data)
})

test('APIHandler can handle a mock get call that returns an error', async () => {
    const error = {
        "data": {
            "errors": {
                "message": "Invalid fetch"
            }
        }
    };
    const url = '/api/users';
    const apiHandler = new MockAPIHandler({ [url]: [error] });
    const fetchResult = await apiHandler.get(url);

    expect.assertions(1);
    expect(fetchResult).toEqual(error.data)
})