import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthenticatedHeader from 'components/header/Header';
import ClientsPage from "components/Clients/ClientsPage";
import Login from 'components/login/Login';
import APIHandler from './utilities/APIHandler/apiHandler';
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
  return (
    <>
      <AuthenticatedHeader user={user} setUser={setUser} apiHandler={apiHandler} />
      <UnauthenticatedApp setUser={setUser} apiHandler={apiHandler}>
        <Route exact path="/clients" render={(props) => <ClientsPage apiHandler={apiHandler} {...props} />} />
      </UnauthenticatedApp>
    </>
  )
}

export const App = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])

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

export const AppRouter = (props) => (
  <BrowserRouter>
    <App apiHandler={apiHandler} />
  </BrowserRouter>
)