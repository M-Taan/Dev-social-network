import { React, useState } from "react";

const Register = () => {
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
      console.log(registerData);
    } else {
      alert("Password doesn't match");
    }
  };

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

export default Register;
