import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/UI/Navbar";
import Landing from "./components/UI/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Fragment } from "react";
const App = () => {
  const displayLanding = () => {
    return (
      <Route exact path="/">
        <Navbar className={"navbar"} />
        <Landing />
      </Route>
    );
  };

  const displayLogin = () => {
    return (
      <Route exact path="/login">
        <Navbar className={"navbar bg-dark inlined"} />
        <Login />
      </Route>
    );
  };

  const displayRegister = () => {
    return (
      <Route exact path="/register">
        <Navbar className={"navbar bg-dark inlined"} />
        <Register mainClass={"container"} />
      </Route>
    );
  };

  return (
    <Router>
      <>
        {displayLanding()}
        <Switch>
          {displayLogin()}
          {displayRegister()}
        </Switch>
      </>
    </Router>
  );
};

export default App;
