import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import { NavLink, useHistory } from "react-router-dom";
import SessionCheck from "./SessionCheck";
import { useDispatch } from "react-redux";
import axios from "axios";
import ping from "web-pingjs";
import firebaseDB from "../firebaseDB";

let socket = new WebSocket("wss://wsdesktop.bitkub.com/websocket-market-api/subscribe/ticker");

function Navbar(props) {
  const dispatch = useDispatch();
  const [currentUser, setcurrentUser] = useState(null);
  const [UserShow, setUserShow] = useState(null);
  const [Ping, setPing] = useState("");
  const [Connect, setConnect] = useState(false);
  const history = useHistory();
  const Logout = () => {
    dispatch({
      type:"DELETE_ALL",
      data:[]
    })
    firebase.auth().signOut().then(history.push("/login"));
  };

  useEffect(() => {
    // ping("https://bitkub.com/api/status")
    //   .then(function (delta) {
    //     setPing(String(delta));
    //     setConnect(true);
    //   })
    //   .catch(function (err) {
    //     // console.error("Could not ping remote URL", err);
    //     setConnect(false);
    //   });
    // setInterval(() => {
    //   ping("https://bitkub.com/api/status")
    //     .then(function (delta) {
    //       setPing(String(delta));
    //       setConnect(true);
    //     })
    //     .catch(function (err) {
    //       // console.error("Could not ping remote URL", err);
    //       setConnect(false);
    //     });
    // }, 20000);
  }, []);

  const setDataWss = (data) => {
    dispatch({
      type: "SET_DATA_TRADE",
      data: data,
      trade: true,
    });
  };



  const getFist = async () => {
    await axios
      .get("https://api.bitkub.com/api/market/symbols")
      .then((data) => {
        var obj = [];
        for (let index = 0; index < data.data.result.length; index++) {
          set_data({
            symbol: data.data.result[index].symbol.replace("THB_", ""),
            data: data.data.result[index],
          });
        }
      });
  };

  const getData = async () => {
    await axios.get("https://api.bitkub.com/api/market/ticker").then((data) => {
      for (let key in data.data) {
        set_data_trade({
          symbol: key.replace("THB_", ""),
          data: data.data[key],
        });
      }
    });
  };

const add_data = () => {
  firebaseDB.database().ref('users/12').set({
    username: "name",
    email: "email",
    profile_picture : "imageUrl"
  });
}

  const wssOnmessage = () => {
    socket.onmessage = (event) => {
      let data = JSON.parse(event.data).data;
      var data2 = {
        symbol: data.stream.replace("market.ticker.thb_", "").toUpperCase(),
        data: data,
      };
      setDataWss(data2);
    };
  };

  const set_data = (data) => {
    dispatch({
      type: "SET_DATA_SYMBOL",
      data: data,
      trade: false,
    });
  };

  const set_data_trade = (data) => {
    dispatch({
      type: "SET_DATA_TRADE",
      data: data,
      trade: true,
    });
  };

  useEffect(() => {
    getFist();
    getData();
    wssOnmessage();
  }, []);

  useEffect(() => {
    if (currentUser != null) {
      if (currentUser.displayName != null) {
        setUserShow(currentUser.displayName);
        // console.log()
      } else {
        setUserShow(currentUser.email);
        // console.log()
      }
    }
  }, [currentUser]);

  return (
    <div>
      <SessionCheck userData={(value) => setcurrentUser(value)} />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/trade/BTC">
                  Trade
                </NavLink>
              </li>
            </ul>
            {/* {Connect ? (
              <button
                style={{ "margin-right": " 10px" }}
                className="btn btn-outline-success"
                title="Ping to Bitkub"
              >
                {Ping} ms
              </button>
            ) : (
              <button
                style={{ "margin-right": " 10px" }}
                className="btn btn-outline-danger"
                title="Disconect Internet"
              >
                <i class="fas fa-unlink"></i>
              </button>
            )} */}
            {UserShow ? (
              <button
              // onClick={()=>add_data}
                style={{ "margin-right": " 10px" }}
                className="btn btn-outline-primary"
              >
                {UserShow}
              </button>
            ) : (
              <button
                style={{ "margin-right": " 10px" }}
                className="btn btn-outline-primary"
              >
                <i class="fas fa-circle-notch fa-spin"></i>
              </button>
            )}

            <button onClick={Logout} className="btn btn-outline-danger mr-3">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
