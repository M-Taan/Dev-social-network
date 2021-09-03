import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";

const Comment = ({
  post_id,
  comment,
  comment: { user },
  auth,
  deleteComment,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={user.avatar} alt="" />
          <h4>{user.name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
          <Moment format="YYYY/MM/DD">{comment.date}</Moment>
        </p>
        {auth.user._id === user._id && (
          <button
            onClick={(e) => deleteComment(post_id, comment._id)}
            type="button"
            class="btn btn-danger"
          >
            <i class="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(Comment);
