import spinner from "../../img/bl_spinner.gif";

import React from "react";
import { Fragment } from "react";

const Loading = () => {
  return (
    <Fragment>
      <img
        style={{
          display: "block",
          width: "100px",
          margin: "auto",
          marginTop: "300px",
        }}
        src={spinner}
        alt=""
      ></img>
    </Fragment>
  );
};

export default Loading;
