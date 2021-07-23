import { React, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addEducation } from "../../actions/profile";
import { connect } from "react-redux";
import Alert from "../UI/Alert";

const AddEducation = ({ addEducation, history }) => {
  const [eduForm, setEduForm] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDate, setToDate] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } =
    eduForm;

  // Handle the input change of the register form
  const handleInputChange = (event) => {
    const value = event.target.value;

    setEduForm({ ...eduForm, [event.target.name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addEducation(eduForm, history);
    window.scrollTo(0, 0);
  };
  return (
    <section className="container">
      <Alert />
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(event) => handleSubmit(event)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={(event) => handleInputChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={(event) => handleInputChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              checked={current}
              name="current"
              value={current}
              onChange={(event) => {
                setEduForm({ ...eduForm, current: !current });
                setToDate(!toDate);
              }}
            />{" "}
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(event) => handleInputChange(event)}
            disabled={toDate ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={(event) => handleInputChange(event)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
