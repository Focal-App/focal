let API_URL

process.env.REACT_APP_STAGE === 'dev'
  ? API_URL = 'http://localhost:4000'
  : API_URL = 'https://focal-api.herokuapp.com';

export default API_URL;