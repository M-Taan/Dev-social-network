import { React, useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const Register = ({ setAlert, register, isAuth }) => {
  // State for the different fields in the register form
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
  });

  // Handle the input change of the register form
  const handleInputChange = (event) => {
    const value = event.target.value;

    setRegisterData({ ...registerData, [event.target.name]: value });
  };

  // Destructure the regsiter form state
  const { name, email, password, conPassword } = registerData;

  // Handle when pressing submit button
  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === conPassword) {
      register({ name, email, password });
    } else {
      setAlert("Password doesn't match", "danger");
    }
  };

  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(event) => handleSubmit(event)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(event) => handleInputChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(event) => handleInputChange(event)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(event) => handleInputChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="conPassword"
            minLength="6"
            value={conPassword}
            onChange={(event) => handleInputChange(event)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="/login">Sign In</a>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
