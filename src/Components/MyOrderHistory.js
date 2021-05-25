import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const commaNumber = (number, n) => {
    try {
      var num = Number.parseFloat(number).toFixed(n);
      return numberWithCommas(num);
    } catch {
      return <i class="fas fa-circle-notch fa-spin"></i>;
    }
  };
  
  const numberWithCommas = (x) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

export default function MyOrderHistory(props) {
  const [history, sethistory] = useState([]);
  const [hasOrder, setHasOrder] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // console.log("🚀 ~ file: MyOrderHistory.js ~ line 10 ~ firebase.auth ~ user", props.symbol)
      // console.log("🚀 ~ file: MyOrderHistory.js ~ line 10 ~ firebase.auth ~ user", user.uid)
      firebase
        .database()
        .ref(`users/${user.uid}/asset/${props.symbol}/order`)
        .on("value", (snapshot1) => {
          if (snapshot1.exists()) {
            setHasOrder(true);
            var obj = [];
            for (let key in snapshot1.val()) {
              obj.push(snapshot1.val()[key]);
              // console.log(snapshot1.val()[key])
            }
            sethistory(obj);
          }
        });
    });
  }, []);

  useEffect(() => {
    console.log(history);
  }, [history]);

  const cover_time = (time) => {
      return new Date(time).toLocaleString()
  }

  return (
    <div className="table-responsive">
      <table className="table table-dark table-responsive">
        <thead>
          <tr>
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Order
            </th>
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Type
            </th>
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Rate
            </th>
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Volume
            </th>
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
            Received
            </th>
            {/* <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Opened Date
            </th> */}
            <th style={{ color: "#8096a0", "font-size": "13px" }} scope="col">
              Closed Date
            </th>
          </tr>
        </thead>
        {hasOrder ? (
          <tbody className="overflow-auto">
            {history.map((item,index) => (
              <tr>
                <th className="p-1" scope="row">{index + 1}</th>
                <td className="p-1">{item.order_type}</td>
                <td className="p-1">{commaNumber(item.price,2)} THB</td>
                <td className="p-1">{item.order_type == 'buy' ? commaNumber(item.spent,2) : commaNumber(item.spent,8)} {item.order_type == 'buy' ? "THB" : props.symbol}</td>
                <td className="p-1">{item.order_type == 'buy' ? `${commaNumber(item.you_received,8)} ${props.symbol}` : `${commaNumber(item.you_received,2)} THB`}</td>
                {/* <td className="p-1">---</td> */}
                <td className="p-1">{cover_time(item.timestamp)}</td>
              </tr>
            ))}

          </tbody>
        ) : (
          ""
        )}
      </table>
      {!hasOrder ? (
        <div className="text-center">
          <i
            style={{ color: "rgb(128, 150, 160)" }}
            className="far fa-2x fa-file-alt"
          />

          <h6 className="mt-2">
            <font>No History</font>
          </h6>
          <p
            className="text--normal1 nom "
            style={{
              position: "relative",
              verticalAlign: "middle",
              marginBottom: 10,
              color: "rgb(128, 150, 160)",
            }}
          >
            <font>Start Trading!</font>
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
