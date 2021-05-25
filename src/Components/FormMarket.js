import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import firebase from "../firebase";
import Swal from "sweetalert2";

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

function FormMarket(props) {
  const [asset, setAsset] = useState(null);
  const [thb, setThb] = useState(null);
  const [buyValue, setBuyValue] = useState(null);
  const [sellValue, setSellValue] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cryptoCurrent, setCryptoCurrent] = useState(null);

  const get_asset = () => {
    firebase.auth().onAuthStateChanged((user) => {
      firebase
        .database()
        .ref(`users/${user.uid}/asset/THB`)
        .on("value", (snapshot) => {
          setThb(snapshot.val());
        });
      firebase
        .database()
        .ref(`users/${user.uid}/asset/${props.symbol}`)
        .on("value", (snapshot1) => {
          if (snapshot1.exists()) {
            setAsset(snapshot1.val());
          }
        });
    });
  };
  // useEffect(() => {
  //   console.log(cryptoCurrent);
  // }, [cryptoCurrent]);

  useEffect(() => {
    for (let index = 0; index < props.crypto_data.length; index++) {
      if (props.crypto_data[index].symbol === props.symbol) {
        setCryptoCurrent(props.crypto_data[index].data)
        // console.log(props.crypto_data[index].data);
      }
    }
    // console.log(props.crypto_data)
  }, [props.crypto_data]);

  useEffect(() => {
    get_asset();
    firebase.auth().onAuthStateChanged((user) => {
      setUserData(user);
    });
  }, []);

  const buyCrypto = () => {
    var now = new Date();
    if (buyValue > 0) {
      if (buyValue <= thb) {
        var current_price = cryptoCurrent.last
        firebase
          .database()
          .ref(`users/${userData.uid}/asset/${props.symbol}/order`)
          .push({
            order_type: "buy",
            spent: buyValue,
            spent_show:`${commaNumber(buyValue, 2)} THB`,
            price: current_price,
            price_show:`${commaNumber(current_price,2)} THB/${props.symbol}`,
            you_received: buyValue / current_price,
            you_received_show:`${commaNumber(buyValue / current_price,2)} ${props.symbol}`,
            symbol: props.symbol,
            timestamp: now.toJSON(),
          });
          // console.log(buyValue)
          // console.log(thb.value)
        firebase
          .database()
          .ref(`users/${userData.uid}/asset/THB`)
          .update({
            value: thb.value - buyValue,
          });
        firebase
          .database()
          .ref(`users/${userData.uid}/asset/${props.symbol}`)
          .update({
            value: asset.value + buyValue / current_price,
          });
        Swal.fire({
          icon: "success",
          title: "ซื้อ " + props.symbol + " สำเร็จ",
          // timer: 1300,
          text:
            "ที่ราคา : " +
            commaNumber(current_price,2) +
            " THB | จำนวน : " +
            commaNumber(buyValue / current_price,8) +
            " " +
            props.symbol,
        });
        setBuyValue("")
      } else {
        Swal.fire({
          icon: "error",
          title: "ทำรายการไม่สำเร็จ",
          timer: 1500,
          text: "THB ไม่พอ",
        });
      }
    }
  };

  const sellCrypto = () => {
    var now = new Date();
    if (sellValue > 0) {
      if (sellValue <= asset.value) {
        var current_price = cryptoCurrent.last
        firebase
          .database()
          .ref(`users/${userData.uid}/asset/${props.symbol}/order`)
          .push({
            order_type: "sell",
            spent: sellValue,
            spent_show:`${commaNumber(sellValue, 2)} ${props.symbol}`,
            price: current_price,
            price_show:`${commaNumber(current_price,2)} THB/${props.symbol}`,
            you_received: sellValue * current_price,
            you_received_show:`${commaNumber(sellValue * current_price,2)} ${props.symbol}`,
            symbol: props.symbol,
            timestamp: now.toJSON(),
          });
          // console.log(sellValue)
          // console.log(thb.value)
        firebase
          .database()
          .ref(`users/${userData.uid}/asset/THB`)
          .update({
            value: thb.value + sellValue * current_price,
          });
        firebase
          .database()
          .ref(`users/${userData.uid}/asset/${props.symbol}`)
          .update({
            value: asset.value - sellValue,
          });
        Swal.fire({
          icon: "success",
          title: "ขาย " + props.symbol + " สำเร็จ",
          // timer: 1300,
          text:
            "ที่ราคา : " +
            commaNumber(current_price,2) +
            " THB | จำนวน : " +
            commaNumber(sellValue,8) +
            " " +
            props.symbol,
        });
        setSellValue("")
      } else {
        Swal.fire({
          icon: "error",
          title: "ทำรายการไม่สำเร็จ",
          timer: 1500,
          text: `${props.symbol}`,
        });
      }
    }
  };

  const Loading = () => {
    return (
      <div>
        <div style={{ width: 60 }} className="ssc-line mb-3"></div>
        {[...Array(5)].map((x, i) => (
          <div className="row mb-3">
            <div className="col">
              <div className="ssc-line" key={i}></div>
            </div>
            <div className="col">
              <div className="ssc-line" key={i}></div>
            </div>
            <div className="col">
              <div className="ssc-line" key={i}></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {asset != null && thb != null ? (
        <div>
          <h5 className="text-light">Market</h5>
          <hr className="text-light my-2" />
          <div className="row text-light">
            <div
              // style={{ "border-right": "3px solid #343d3d;" }}
              className="col-sm"
            >
              <font className="float-start">Available Balance THB</font>
              <font className="float-end">
                <font className="text-green">
                  {commaNumber(thb.value, 2)}
                </font>{" "}
                THB
              </font>
              <br />
              <div
                className="market__input-wrapper market__input-wrapper--newmarket"
                style={{
                  backgroundColor: "transparent",
                  color: "rgb(232, 232, 232)",
                  border: "1px solid rgb(128, 150, 160)",
                }}
              >
                <span className="market__input-text">
                  <font>You Spend</font>{" "}
                </span>
                <NumberFormat
                  className="market__input-wrapper--form market__input-wrapper--dark"
                  thousandSeparator={true}
                  isNumericString={true}
                  placeholder="0.00"
                  value={buyValue}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setBuyValue(value)
                  }}
                />
                <span
                  className="market__unit"
                  style={{ color: "rgb(232, 232, 232)" }}
                  isNumericString={true}
                >
                  THB
                </span>
              </div>
              <div class="d-grid gap-2">
                <button onClick={()=>buyCrypto()} class="btn btn-success btn-green-new" type="button">
                  <b>BUY</b>
                </button>
              </div>
            </div>
            <div className="col-sm">
              <font className="float-start">
                Available Balance {props.symbol}
              </font>
              <font className="float-end">
                <font className="text-green">
                  {commaNumber(asset.value, 8)}
                  {/* {commaNumber(1000, 2)} */}
                </font>{" "}
                {props.symbol}
              </font>
              <br />
              <div
                className="market__input-wrapper market__input-wrapper--newmarket"
                style={{
                  backgroundColor: "transparent",
                  color: "rgb(232, 232, 232)",
                  border: "1px solid rgb(128, 150, 160)",
                }}
              >
                <span className="market__input-text">
                  <font>You Sell</font>{" "}
                </span>
                <NumberFormat
                  value={sellValue}
                  className="market__input-wrapper--form market__input-wrapper--dark"
                  thousandSeparator={true}
                  F
                  isNumericString={true}
                  placeholder="0.00000000"
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setSellValue(value)
                  }}
                />
                <span
                  className="market__unit"
                  style={{ color: "rgb(232, 232, 232)" }}
                  isNumericString={true}
                >
                  {props.symbol}
                </span>
              </div>
              <div class="d-grid gap-2">
                <button onClick={()=>sellCrypto()} class="btn btn-red-new text-light" type="button">
                  <b>SELL</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

const map_data = (state) => {
  return {
    crypto_data: state.crypto_data,
  };
};

export default connect(map_data)(FormMarket);
