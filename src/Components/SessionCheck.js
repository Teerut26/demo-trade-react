import React, { useEffect } from "react";
import auth from "../firebase";
import { useHistory } from "react-router-dom";

export default function SessionCheck(props) {
  
  const history = useHistory();
  auth.auth().onAuthStateChanged((user) => {
    if (user) {
      props.userData(user)
     } 
    else {
      history.push("/login");
    }
  });

  return ""
}


