import { React, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import PropTypes from "prop-types";
import Loading from "../UI/Loading";
import { Fragment } from "react";
import PostPlace from "./PostPlace";
import Alert from "../UI/Alert";
import PostSection from "./PostSection";

const Posts = ({ getPosts, post: { loading, posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading && posts !== undefined ? (
    <Loading />
  ) : (
    <Fragment>
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome to the community!
        </p>
        <PostSection />
        <div className="posts">
          {posts.map((post) => (
            <PostPlace key={post._id} post={post} />
          ))}
        </div>
      </section>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
