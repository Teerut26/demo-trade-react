import React, { useState } from "react";
import auth from "../firebase";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import firebaseDB from "../firebaseDB";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [showAlert, setshowAlert] = useState(false);
  const [DataAlert, setDataAlert] = useState("");

  const history = useHistory();

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (password == password2) {
      auth
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          setLoading(false);
          history.push("/");
        })
        .catch((e) => {
          setshowAlert(true);
          setDataAlert(e.message);
          setTimeout(() => {
            setLoading(false);
            setshowAlert(false);
          }, 5000);
        });
    }
  };

  return (
    <div className="container-sm mt-5">
      <div className="card">
        <div className="card-body">
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
              className="form-control"
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
              className="form-control"
            />
            <label className="form-label" htmlFor="form1Example2">
              Re-Password
            </label>
            <input
              value={password2}
              onChange={(v) => setPassword2(v.target.value)}
              type="password"
              id="form1Example2"
              className="form-control mb-3"
            />
            <div>
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
            </div>
          </form>
          {showAlert ? (
            <div className="alert alert-danger mt-3" role="alert">
              {DataAlert}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default connect()(Login);
