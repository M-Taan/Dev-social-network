import { React, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./helpers/setAuthToken";
import { loadUser } from "./actions/auth";

import Navbar from "./components/UI/Navbar";
import Landing from "./components/UI/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/UI/Alert";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

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
    <Provider store={store}>
      <Router>
        <>
          {displayLanding()}
          <Alert />
          <Switch>
            {displayLogin()}
            {displayRegister()}
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
