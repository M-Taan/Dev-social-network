import { Fragment } from "react";
import Navbar from "./UI/Navbar";
import Landing from "./UI/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Alert from "./UI/Alert";
import Dashboard from "./dashboard/Dashboard";
import PrvtRoute from "./PrvtRoute";

import CreateProfile from "./profile/CreateProfile";
import EditProfile from "./profile/EditProfile";
import AddExperience from "./profile/AddExperience";
import AddEducation from "./profile/AddEducation";
import { Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path="/">
          <Navbar className={"navbar"} />
          <Landing />
        </Route>
        <Route exact path="/login">
          <Navbar className={"navbar bg-dark "} />
          <Login />
        </Route>
        <Route exact path="/register">
          <Navbar className={"navbar bg-dark "} />
          <Register />
        </Route>
        <PrvtRoute
          exact
          path="/dashboard"
          component={Dashboard}
          navbar={Navbar}
        />
        <PrvtRoute
          exact
          path="/create-profile"
          component={CreateProfile}
          navbar={Navbar}
        />
        <PrvtRoute
          exact
          path="/edit-profile"
          component={EditProfile}
          navbar={Navbar}
        />
        <PrvtRoute
          exact
          path="/add-experience"
          component={AddExperience}
          navbar={Navbar}
        />
        <PrvtRoute
          exact
          path="/add-education"
          component={AddEducation}
          navbar={Navbar}
        />
      </Switch>
    </Fragment>
  );
};

export default Routes;