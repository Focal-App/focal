let API_URL

process.env.REACT_APP_STAGE === 'dev'
  ? API_URL = 'http://localhost:4000'
  : API_URL = 'https://focal-api.herokuapp.com';

const Endpoints = {
  getUser: (user_uuid) => `${API_URL}/api/user/${user_uuid}`,
  getClients: (user_uuid) => `${API_URL}/api/user/${user_uuid}/clients/data`,
  getClient: (client_uuid) => `${API_URL}/api/client/${client_uuid}/data`,
  newClient: `${API_URL}/api/client`,
  googleLogin: `${API_URL}/auth/google?scope=email%20profile`,
  logout: `${API_URL}/auth/signout`
}

export default Endpoints;