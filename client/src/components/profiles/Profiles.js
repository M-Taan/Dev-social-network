import { React, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getAllProfiles } from "../../actions/profile";
import { connect } from "react-redux";
import Loading from "../UI/Loading";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getAllProfiles, profile }) => {
  useEffect(() => {
    getAllProfiles();
    console.log(profile.profiles);
  }, []);
  return (
    <section className="container">
      {profile.loading || profile.profiles === [] ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profile.profiles.length < 0 ? (
              <h2> No Profiles </h2>
            ) : (
              profile.profiles.map((obj) => (
                <ProfileItem key={profile._id} profile={obj} />
              ))
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
