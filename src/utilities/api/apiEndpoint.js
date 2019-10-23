let API_URL

process.env.REACT_APP_STAGE === 'dev'
  ? API_URL = 'http://localhost:4000'
  : API_URL = 'https://focal-api.herokuapp.com';

const Endpoints = {
  getUser: (user_uuid) => `${API_URL}/api/users/${user_uuid}`,
  getTemplates: (user_uuid) => `${API_URL}/api/users/${user_uuid}/templates`,
  getClients: (user_uuid) => `${API_URL}/api/users/${user_uuid}/clients/data`,
  getClient: (client_uuid) => `${API_URL}/api/clients/${client_uuid}/data`,
  deleteClient: (client_uuid) => `${API_URL}/api/clients/${client_uuid}`,
  updateClient: (client_uuid) => `${API_URL}/api/clients/${client_uuid}`,
  updatePackage: (package_uuid) => `${API_URL}/api/packages/${package_uuid}`,
  createPackage: (client_uuid) => `${API_URL}/api/clients/${client_uuid}/packages`,
  updateEvent: (event_uuid) => `${API_URL}/api/events/${event_uuid}`,
  createEvent: (package_uuid) => `${API_URL}/api/packages/${package_uuid}/events`,
  getEvents: (package_uuid) => `${API_URL}/api/packages/${package_uuid}/events`,
  updateWorkflow: (workflow_uuid) => `${API_URL}/api/workflows/${workflow_uuid}`,
  updateTask: (task_uuid) => `${API_URL}/api/tasks/${task_uuid}`,
  getWorkflows: (client_uuid) => `${API_URL}/api/clients/${client_uuid}/workflows`,
  newClient: `${API_URL}/api/clients`,
  googleLogin: `${API_URL}/auth/google?scope=email%20profile`,
  logout: `${API_URL}/auth/signout`
}

export default Endpoints;