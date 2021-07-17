import { React, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
    console.log("Handle Login is working");
  };

  return (
    <section class="container">
      <div class="alert alert-danger">Invalid credentials</div>
      <h1 class="large text-primary">Sign In</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Sign into Your Account
      </p>
      <form class="form" onSubmit={(event) => handleLogin(event)}>
        <div class="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(event) => handleInputChange(event)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(event) => handleInputChange(event)}
            required
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </form>
      <p class="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;
