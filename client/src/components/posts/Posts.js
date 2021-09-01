import { React, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import PropTypes from "prop-types";
import Loading from "../UI/Loading";
import { Fragment } from "react";
import PostPlace from "./PostPlace";

const Posts = ({ getPosts, post: { loading, posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <section class="container">
        <h1 class="large text-primary">Posts</h1>
        <p class="lead">
          <i class="fas fa-user"></i> Welcome to the community!
        </p>
        {/* Post Form */}
        <div class="posts">
          {posts.map((post) => (
            <PostPlace key={post._id} post={post} />
          ))}
        </div>
      </section>
    </Fragment>
  );
};

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
