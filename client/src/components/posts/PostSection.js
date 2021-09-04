import { React, useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostSection = ({ addPost }) => {
  const [text, setText] = useState("");
  // On Change
  const changeHandeler = (e) => {
    setText(e.target.value);
  };
  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ text });
    setText("");
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          value={text}
          onChange={(e) => changeHandeler(e)}
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default connect(null, { addPost })(PostSection);
