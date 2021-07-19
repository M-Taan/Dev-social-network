import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ className, auth: { isAuth, loading }, logout }) => {
  const isLoggedOut = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const isLoggedIn = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i> {"  "}
          <span className="hide-sm"> Dashboard </span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className={className}>
      <h1>
        <Link to="/">
          <i className="fas fa-terminal"></i> DevLeb
        </Link>
      </h1>
      {!loading && (isAuth ? isLoggedIn : isLoggedOut)}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
