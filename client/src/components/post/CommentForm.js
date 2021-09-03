import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ id, addComment }) => {
  console.log("ID is" + id);
  const [text, setText] = useState("");
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ text }, id);
    setText("");
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          value={text}
          name="text"
          onChange={(e) => setText(e.target.value)}
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default connect(null, { addComment })(CommentForm);
