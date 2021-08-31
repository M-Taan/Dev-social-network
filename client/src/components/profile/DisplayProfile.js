import { React, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getProfileById } from "../../actions/profile";
import { connect } from "react-redux";
import Loading from "../UI/Loading";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import Experience from "./Experience";
import Education from "./Education";
import GithubRepo from "./GithubRepo";

const DisplayProfile = ({
  getProfileById,
  match,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="container">
            <Link to="/profiles" className=" btn btn-light">
              Back
            </Link>
            {auth.isAuth &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to="/edit-profile" className="btn btn-dark">
                  Edit Profile
                </Link>
              )}
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length !== 0 ? (
                  profile.experience.map((exp, index) => (
                    <div key={index}>
                      <Experience experience={exp} />
                    </div>
                  ))
                ) : (
                  <div>No Experience to Show</div>
                )}
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length !== 0 ? (
                  profile.education.map((edu, index) => (
                    <div key={index}>
                      <Education edu={edu} />
                    </div>
                  ))
                ) : (
                  <div>No Education Enlisted</div>
                )}
              </div>
              {profile.githubusername && (
                <GithubRepo username={profile.githubusername} />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

DisplayProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(DisplayProfile);
