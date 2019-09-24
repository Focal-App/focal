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
#### 1. Predictable Data Shapes for the frontend
#### 2. Transform API values to formatted values
It can set formatted default values for null or un-renderable API values that the frontend can render with. For example:
```
// Null values are turned to dashes to signify no content
null → "-"

// ISOStrings are converted to formatted dates
"2019-04-17T07:00:00.000Z" → "April 17, 2019"

// Penny integers are converted to price strings
1000 → "10.00"
```
These formatted values allow the frontend codebase to immediately render values without checking the validity of the value (no more `event_name ? event_name : "-"` validity checks in react components).

#### 3. Prepare data for the API (reverses the formatted value changes)
#### 4. Prepare data for forms 
For example, dates need to be a specific date format to render correctly in the input date elements.
#### 5. Generate empty data modules
For example, when passing in no existing event object to `DataAdapter.toEventModel()`, it will generate a default event data object with no UUID. This is then used to pass into a create event form to make sure the form data shape is what the API expects. 

### MockApiHandler class 

### Behavioral Level Tests
