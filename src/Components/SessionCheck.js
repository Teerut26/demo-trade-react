import React, { useEffect, useState } from "react";
import auth from "../firebase";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
function SessionCheck(props) {
  const history = useHistory();
  auth.auth().onAuthStateChanged((user) => {
    if (user) {
      props.userData(user);
      props.dispatch({
        type: "SET_USER_DATA",
        data: user,
      });
    } else {
      history.push("/login");
    }
  });

  return "";
}

export default connect()(SessionCheck);
