import React from "react";
import { Fragment } from "react";
import Moment from "react-moment";

const Education = ({
  edu: { school, degree, fieldofstudy, current, from, to, description },
}) => {
  return (
    <Fragment>
      <h3>{school}</h3>
      <p>
        {" "}
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {current ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
      {description && (
        <p>
          <strong>Description: </strong>Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Dignissimos placeat, dolorum ullam ipsam, sapiente
          suscipit dicta eius velit amet aspernatur asperiores modi quidem
          expedita fugit.
        </p>
      )}
    </Fragment>
  );
};

export default Education;
