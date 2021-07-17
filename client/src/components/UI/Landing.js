import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
  <section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">Developers Lebanon!</h1>
        <p className="lead">Connecting developers throughout Lebanonn.</p>
        <p className="lead">Let's build a community.</p>
        <div>
          <Link to="/register" className="btn btn-primary">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-light">
            Login
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Landing;
