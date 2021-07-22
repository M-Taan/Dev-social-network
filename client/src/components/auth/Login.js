/* eslint-disable no-unused-expressions */
/* eslint-disable no-labels */
import { React, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Alert from "../UI/Alert";

const Login = ({ login, isAuth }) => {
  // State for the login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;

  // Handle the input change of the register form
  const handleInputChange = (event) => {
    const value = event.target.value;

    setLoginData({ ...loginData, [event.target.name]: value });
  };

  // Handle the login form submit
  const handleLogin = (event) => {
    event.preventDefault();
    login(email, password);
  };

  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container">
      {/* <div className="alert alert-danger">Invalid credentials</div> */}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={(event) => handleLogin(event)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(event) => handleInputChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(event) => handleInputChange(event)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
