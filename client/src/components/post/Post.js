import { React, useEffect } from "react";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import PostPlace from "../posts/PostPlace";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import Loading from "../UI/Loading";
import CommentForm from "./CommentForm";

const Post = ({ match, getPost, post: { post, loading } }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading ||
    post === undefined ||
    post === null ||
    post.comments === null ||
    post.comments === undefined ||
    post.comments.length === undefined ? (
    <Loading />
  ) : (
    <section className="container">
      <Link to="/posts" class="btn">
        Back To Posts
      </Link>
      <PostPlace showForm={false} post={post} />
      <CommentForm id={post._id} />
      <div className="commnets">
        {post.comments.length > 0 &&
          post.comments.map((cmnt) => (
            <Comment post_id={post._id} comment={cmnt} />
          ))}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
