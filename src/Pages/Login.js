import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import firebase from "@firebase/app";
import "firebase/auth";
import "@firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyDUDpko95UsPYdEA02f0pUKwIf-oh-Qxhw",
  authDomain: "funny-trade.firebaseapp.com",
  databaseURL:
    "https://funny-trade-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "funny-trade",
  storageBucket: "funny-trade.appspot.com",
  messagingSenderId: "713373565015",
  appId: "1:713373565015:web:4e1dc3ce22721092946312",
  measurementId: "G-4329WB9475",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [showAlert, setshowAlert] = useState(false);
  const [DataAlert, setDataAlert] = useState("");

  const history = useHistory();

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        props.SetCurrentUser(response.user);
        firebase
          .database()
          .ref(`users/${response.user.uid}`)
          .once("value")
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(true);
            } else {
              console.log(false);
              firebase
                .database()
                .ref(`users/${response.user.uid}`)
                .set({
                  uid: response.user.uid,
                  asset: {
                    THB: {
                      value: 50000000,
                    },
                  },
                });
            }
          });
        history.push("/");
        setLoading(false);
        // history.push("/");
      })
      .catch((e) => {
        setLoading(false);
        setshowAlert(true);
        setDataAlert(e.message);
        setTimeout(() => {
          setshowAlert(false);
        }, 5000);
      });
  };

  const signFacebook = () => {
    console.log("login Facebook");
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        firebase
          .database()
          .ref(`users/${res.user.uid}`)
          .once("value")
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(true);
            } else {
              console.log(false);
              firebase
                .database()
                .ref(`users/${res.user.uid}`)
                .set({
                  uid: res.user.uid,
                  asset: {
                    THB: {
                      value: 50000000,
                    },
                  },
                });
            }
          });
        history.push("/");
      })
      .catch((e) => {
        setshowAlert(true);
        setDataAlert(e.message);
        setTimeout(() => {
          setshowAlert(false);
        }, 5000);
        // console.log(e.message);
      });
  };

  const signGoogle = () => {
    console.log("login Google");
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        firebase
          .database()
          .ref(`users/${res.user.uid}`)
          .once("value")
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(true);
            } else {
              console.log(false);
              firebase
                .database()
                .ref(`users/${res.user.uid}`)
                .set({
                  uid: res.user.uid,
                  asset: {
                    THB: {
                      value: 50000000,
                    },
                  },
                });
            }
          });
        // props.SetCurrentUser(res.user);
        history.push("/");
      })
      .catch((e) => {
        setshowAlert(true);
        setDataAlert(e.message);
        setTimeout(() => {
          setshowAlert(false);
        }, 5000);
        // console.log(e.message);
      });
  };

  const signGitHub = () => {
    console.log("login GitHub");
    var provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        firebase
          .database()
          .ref(`users/${res.user.uid}`)
          .once("value")
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(true);
            } else {
              console.log(false);
              firebase
                .database()
                .ref(`users/${res.user.uid}`)
                .set({
                  uid: res.user.uid,
                  asset: {
                    THB: {
                      value: 50000000,
                    },
                  },
                });
            }
          });
        history.push("/");
      })
      .catch((e) => {
        setshowAlert(true);
        setDataAlert(e.message);
        setTimeout(() => {
          setshowAlert(false);
        }, 5000);
        // console.log(e.message);
      });
  };

  return (
    <div style={{ paddingTop: 50 }} className="container-sm ">
      <div style={{ height: "calc(100vh - 118px)" }} className="card">
        <div className="card-body bg-dark text-light text-center">
          <h5 className="card-title">เข้าสู่ระบบ</h5>
          <form onSubmit={onSubmit}>
            {/* Email input */}
            <label className="form-label" htmlFor="form1Example1">
              Email address
            </label>
            <input
              value={email}
              onChange={(v) => setEmail(v.target.value)}
              type="email"
              id="form1Example1"
              className="form-control "
            />

            {/* Password input */}
            <label className="form-label" htmlFor="form1Example2">
              Password
            </label>
            <input
              value={password}
              onChange={(v) => setPassword(v.target.value)}
              type="password"
              id="form1Example2"
              className="form-control mb-3"
            />
            <button
              style={{ marginRight: 3 }}
              type="submit"
              className=" btn btn-primary "
            >
              {loading ? (
                <i class="fas fa-circle-notch fa-spin"></i>
              ) : (
                "Sign in"
              )}
            </button>
            <div className="mt-3">
              <div
                onClick={() => signGoogle()}
                style={{
                  backgroundColor: "#dd4b39",
                  color: "white",
                }}
                className="btn"
              >
                <i className="fab fa-google" /> Login With Google
              </div>
              <br />

              <div
                style={{ backgroundColor: "#466ca9", color: "white" }}
                className="btn mt-3"
                onClick={() => signFacebook()}
              >
                <i class="fab fa-facebook-f"></i> Login With Facebook
              </div>
              <br />

              <div
                style={{
                  backgroundColor: "#ebebeb",
                  color: "black",
                }}
                className="btn mt-3"
                onClick={() => signGitHub()}
              >
                <i class="fab fa-github"></i> Login With Github
              </div>
              <br />

              {showAlert ? (
                <div className="alert alert-danger mt-3" role="alert">
                  {DataAlert}
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default connect()(Login);
