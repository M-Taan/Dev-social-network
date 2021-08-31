import React from "react";
import { Fragment } from "react";
import Moment from "react-moment";
const Experience = ({
  experience: { company, title, from, to, current, location, description },
}) => {
  return (
    <Fragment>
      <h3 class="text-dark">{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {current ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      {description && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
    </Fragment>
  );
};
export default Experience;
