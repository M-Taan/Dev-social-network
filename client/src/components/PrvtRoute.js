import { React, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrvtRoute = ({
  component: Component,
  navbar: Navbar,
  isAuth,
  isLoading,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth && !isLoading ? (
          <Redirect to="/login" />
        ) : (
          <Fragment>
            <Navbar className="navbar bg-dark" />
            <Component {...props} />
          </Fragment>
        )
      }
    />
  );
};

PrvtRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStatetoProps = (state) => ({
  isAuth: state.auth.isAuth,
  isLoading: state.auth.loading,
});

export default connect(mapStatetoProps)(PrvtRoute);
