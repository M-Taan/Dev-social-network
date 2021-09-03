/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser, deleteAccount } from "../../actions/profile";
import Loading from "../UI/Loading";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Education from "./Education";
import Experience from "./Experience";
import Alert from "../UI/Alert";

const Dashboard = ({
  getCurrentUser,
  auth,
  profile: { profile, loading },
  loadUser,
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const showCreateProfile = () => {
    return (
      <Fragment>
        <p>Setup your profile, so you can showcase yourself to other devs !</p>
        <Link to="/create-profile" className="btn btn-primary my-1">
          Create Profile
        </Link>
      </Fragment>
    );
  };

  const showCaseProfile = () => {
    return (
      <Fragment>
        <div className="dash-buttons">
          <Link to="/edit-profile" className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i> Edit Profile
          </Link>
          <Link to="/add-experience" className="btn btn-light">
            <i className="fab fa-black-tie text-primary"></i> Add Experience
          </Link>
          <Link to="/add-education" className="btn btn-light">
            <i className="fas fa-graduation-cap text-primary"></i> Add Education
          </Link>
        </div>
        <Experience experience={profile.experience} />
        <Education education={profile.education} />
        <div className="my-2">
          <button onClick={() => deleteAccount()} className="btn btn-danger">
            <i class="fas fa-eraser"></i> Delete My Account
          </button>
        </div>
      </Fragment>
    );
  };

  // RETURN STATEMENT
  return loading || auth.loading ? (
    <Loading />
  ) : (
    <section className="container">
      <Alert />
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {auth.user.name}
      </p>
      {profile !== null ? showCaseProfile() : showCreateProfile()}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentUser,
  deleteAccount,
})(Dashboard);
