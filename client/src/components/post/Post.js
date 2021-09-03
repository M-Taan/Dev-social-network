import { React, useEffect } from "react";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import PostPlace from "../posts/PostPlace";
const Post = ({ match, getPost, post: { post, loading } }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return (
    <section className="container">
      <PostPlace showForm={false} post={post} />
    </section>
  );
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
