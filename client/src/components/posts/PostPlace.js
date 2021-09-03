import { Fragment, React, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostPlace = ({
  post: { text, postedBy, likes, comments, date, _id },
  auth,
  addLike,
  removeLike,
  deletePost,
  showForm,
}) => {
  const [actions, setActions] = useState(
    showForm === undefined ? true : showForm
  );
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={postedBy.avatar} alt="" />
          <h4>{postedBy.name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>

        <p className="post-date">
          {" "}
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {actions && (
          <Fragment>
            <button
              onClick={(e) => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up"></i>
              <span>{` ${likes.length}`}</span>
            </button>
            <button
              onClick={(e) => removeLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion{" "}
              <span className="comment-count">{comments.length}</span>
            </Link>
            {!auth.loading && postedBy._id === auth.user._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
})(PostPlace);
