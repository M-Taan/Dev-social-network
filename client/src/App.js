import { React, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import setAuthToken from "./helpers/setAuthToken";
import { loadUser } from "./actions/auth";
import { PersistGate } from "redux-persist/integration/react";

import Navbar from "./components/UI/Navbar";
import Landing from "./components/UI/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/UI/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrvtRoute from "./components/PrvtRoute";
import Loading from "./components/UI/Loading";
import CreateProfile from "./components/dashboard/CreateProfile";
import EditProfile from "./components/dashboard/EditProfile";

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
        <Navbar className={"navbar bg-dark "} />
        <Login />
      </Route>
    );
  };

  const displayRegister = () => {
    return (
      <Route exact path="/register">
        <Navbar className={"navbar bg-dark "} />
        <Register />
      </Route>
    );
  };

  const displayDashboard = () => {
    return (
      <PrvtRoute
        exact
        path="/dashboard"
        component={Dashboard}
        navbar={Navbar}
      />
    );
  };

  const displayCreateProfile = () => {
    return (
      <PrvtRoute
        exact
        path="/create-profile"
        component={CreateProfile}
        navbar={Navbar}
      />
    );
  };

  const displayEditProfile = () => {
    return (
      <PrvtRoute
        exact
        path="/edit-profile"
        component={EditProfile}
        navbar={Navbar}
      />
    );
  };
  return (
    <Provider store={store}>
      <PersistGate loading={Loading} persistor={persistor}>
        <Router>
          <>
            {displayLanding()}
            <Alert />
            <Switch>
              {displayLogin()}
              {displayRegister()}
              {displayDashboard()}
              {displayCreateProfile()}
              {displayEditProfile()}
            </Switch>
          </>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
