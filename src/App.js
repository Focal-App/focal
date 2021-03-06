import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Clients from "components/Clients/Clients";
import Client from "components/Client/Client";
import AuthenticatedHeader from 'components/Header/AuthenticatedHeader';
import NewClient from "components/NewClient/NewClient";
import Login from 'components/Login/Login';
import APIHandler from './utilities/api/apiHandler';
import './App.scss';

export const UnauthenticatedApp = (props) => {
  const { setUser, apiHandler } = props;
  return (
    <Switch>
      {props.children}
      <Route path="/login/:uuid" render={(props) => <Login setUser={setUser} apiHandler={apiHandler} {...props} />} />
      <Route path="/" render={(props) => <Login setUser={setUser} apiHandler={apiHandler} {...props} />} />
    </Switch>
  );
}

export const AuthenticatedApp = (props) => {
  const { setUser, apiHandler, user } = props;
  const [clients, setClients] = useState([]);

  return (
    <>
      <AuthenticatedHeader user={user} setUser={setUser} apiHandler={apiHandler} />
      <UnauthenticatedApp setUser={setUser} apiHandler={apiHandler}>
        <Route exact path="/clients" render={(props) => <Clients apiHandler={apiHandler} user_uuid={user.uuid} clients={clients} setClients={setClients} {...props} />} />
        <Route exact path="/clients/new" render={(props) => <NewClient apiHandler={apiHandler} {...props} />} />
        <Route exact path="/client/:client_uuid" render={(props) => {
          const { client_uuid } = props.match.params;
          return <Client apiHandler={apiHandler} client_uuid={client_uuid} {...props} />
        }} />
      </UnauthenticatedApp>
    </>
  )
}

export const App = (props) => {
  const [user, setUser] = useState(props.authUser);

  const app = user
    ? <AuthenticatedApp setUser={setUser} user={user} apiHandler={props.apiHandler} />
    : <UnauthenticatedApp setUser={setUser} apiHandler={props.apiHandler} />;

  return (
    <div className="App">
      {app}
    </div>
  )
}


const apiHandler = new APIHandler();
const user = JSON.parse(localStorage.getItem("user"));
export const AppRouter = (props) => (
  <BrowserRouter>
    <App apiHandler={apiHandler} authUser={user} />
  </BrowserRouter>
)
