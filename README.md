![Imgur](https://i.imgur.com/zKCEzXz.png)

# [Focal](https://focal--app.herokuapp.com)
Focal is a workflow and client management tool for wedding photographers. It aims to help photographers consolidate clients information (personal info, photography packages, shoot events, and private notes) and tie it to a set of workflow tasks. 

Future features would include integrating third-party services like Google Gmail, Google Calendar or Stripe to reduce context switching for the users. For example, the app would be able to send emails, update their calendars, or send invoices directly from the workflow tasks. 

The project is built in React and works with a [Elixir/Phoenix API](https://github.com/Focal-App/focal-api). Other dependencies include `react-testing-library`, `formik`, `date-fns`, `axios`, `sass`, `react-router`, `moment`, `jest`.
Note that the project is hosted on Heroku free-plan which has slow spin-up times -- Please give it a few seconds to load.

### Features
* Google Authentication
* Create & Update Client Information
* Create & Update Client Packages
* Create & Update Client Events
* Auto Generated Workflows Tied to Client Packages with Todo-style Task Completion.
* All Clients View with a List of the Current Task for All Clients

### Feature Walkthroughs
* [Creating New Client](https://youtu.be/S4hFWrvEMEs)
* [Updating Client Information](https://youtu.be/jgDKFMmitg8)
* [Creating Client Packages](https://youtu.be/uYYPxFlE4j8)
* [Updating Client Packages to Create Workflows and Create Events](https://youtu.be/t_G9iKNXW-8)
* [Updating Client Packages to Remove Events and Workflows](https://youtu.be/ajFJoyFmCwM)
* [Toggling Task Completion in Client Workflows](https://youtu.be/-RgP7XEnLcc)

## Local Development
### Setup
```
git clone https://github.com/Focal-App/focal.git
cd focal
npm install
npm start // in one terminal
npm test // in a second terminal
```
### Deploying Master
```
git push heroku master --force
```

### Deploying Non-Master branch
```
git push origin/<branch name>:master --force
```
## Technical Highlights 
### DataAdapter class
The DataAdapter class acts as a boundary between the data received from the API and the data shape the rest of the frontend codebase relies on. By wrapping incoming API data with our DataAdapters, any changes to the API data shape can be handled in one place as opposed to updating the changes throughout the codebase.

#### Functionality Includes:
#### 1. Creating predictable data shapes for the frontend
#### 2. Transforming API values to formatted values
It can set formatted default values for null or un-renderable API values that the frontend can render with. For example:
```javascript
// Null values are turned to dashes to signify no content
null → "-"

// ISOStrings are converted to formatted dates
"2019-04-17T07:00:00.000Z" → "April 17, 2019"

// Penny integers are converted to price strings
1000 → "10.00"
```
These formatted values allow the frontend codebase to immediately render values without checking the validity of the value (no more `event_name ? event_name : "-"` validity checks in react components).

#### 3. Preparing data for the API (reverses the formatted value changes)
#### 4. Preparing data for forms 
For example, dates need to be a specific date format to render correctly in the input date elements.
#### 5. Generating empty data modules
For example, `DataAdapter.toEventModel()` will generate a default event data object. This is then used in a create event form to make sure the form data shape is what the API expects. 


### Levels of Testing

This codebase utilities 3 levels of tests, with a focus on fewer unit tests and more behavioral tests.

#### Unit Tests
Unit tests are generally used for simple utility functions.

#### Integration Tests
Integration tests touches several react components, but no mock API calls.

#### Behavioral Tests
Behavioral Tests can mount the entire application and mock API calls. It is used to test behavioral flows that touches numerous pages and components.

Example Behavioral Test:
```javascript
    const user_uuid = "1234";
    const client_uuid = "1111";
    const authUser = { uuid: user_uuid, avatar: "avatar-image-link" };

    it(`renders list of clients if there is client data after successful call, 
        clicking view will take user to client detail page`, async () => {

        // setup component and mock api calls
        const clientsList = MockApiData.successData([
            MockApiData.partialClientData({
                client_first_name: "Sammy",
                partner_first_name: "David",
                upcoming_shoot_date: "2020-07-17T14:00:00Z",
                uuid: client_uuid
            }),
            MockApiData.partialClientData({ 
                uuid: "0000",
                client_first_name: "Natasha",
                partner_first_name: "Zihao",
                package_name: "Wedding Classic", 
                upcoming_shoot_date: "2020-09-17T14:00:00Z",
                current_stage: MockApiData.taskData({ 
                    category: "Proposal & Retainer", 
                    step: "Confirm Proposal & Retainer" 
                })
            })
        ])
        const client = MockApiData.successData(
            MockApiData.allClientData({ uuid: client_uuid })
        )
        const apiHandler = new MockAPIHandler({ 
            [Endpoints.getClients(user_uuid)]: [clientsList],
            [Endpoints.getClient(client_uuid)]: [client]
        });

        let component;
     
        // mounts the entire application as we are testing the flow between 2 pages
        await act(async () => {
            component = render(
                <MemoryRouter initialEntries={["/clients"]} initialIndex={0}>
                    <App apiHandler={apiHandler} authUser={authUser}/>
                </MemoryRouter>
            )
        })

        const { findByText, getByText, getAllByText } = component;

        // asserts expected text to be found on All Clients Page
        await waitForElement(() =>
            findByText(/Sammy & David/i)
        )

        getByText(/Wedding Premier/i)
        getByText(/July 17, 2020/i)
        getByText(/New Client Inquiry/i)
        getByText(/Request More Information/i)

        getByText(/Natasha & Zihao/i)
        getByText(/September 17, 2020/i)
        getByText(/Confirm Proposal & Retainer/i)

        // Clicking the View button to navigate to a client detail page
        await act(async () => {
            fireEvent.click(getAllByText("View")[0]);
        })
        
        // asserts expected text to be found on the Client Detail Page
        await waitForElement(() =>
            findByText(/sammy lee/i)
        )
        getByText(/client information/i)
        getAllByText(/package/i)
        getAllByText(/new client inquiry/i)
    })
```
