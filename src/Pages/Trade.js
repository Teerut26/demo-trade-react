import React from "react";
import { useEffect, useState } from "react";
// import GetRouter from "../Components/GetRouter";
import { connect } from "react-redux";
import { useParams } from "react-router";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import BidsAsk from "../Components/BidsAsk";
import PriceHeader from "../Components/PriceHeader";

const Chart = (props) => (
  <TradingViewWidget
    symbol={`BITKUB:${props.id}THB`}
    theme={Themes.DARK}
    locale="th_TH"
    interval="15"
    timezone="Asia/Bangkok"
    autosize={true}
    show_popup_button={true}
    hide_side_toolbar={false}
  />
);

function Trade(props) {
  let { id } = useParams();
  const [data, setdata] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    props.data.map((item) => {
      if (item.symbol === id) {
        setdata(item);

        // console.log("🚀 ~ file: Trade.js ~ line 75 ~ props.data.map ~ item", item)
      }
    });
  }, [props.data]);

  useEffect(() => {
    if (data != null) {
      setShow(true);
    }
  }, [data]);

  return (
    <div className="px-1  mt-1">
      {show ? (
        <div
          style={{
            height: "calc(100vh - 80px)",
            marginLeft: 0,
            marginRight: 0,
          }}
          className="row "
        >
          
          <div style={{ paddingRight: 5, paddingLeft: 10 }} className="col-sm">
            <div
              style={{ height: "calc(100vh - 68px)", overflow: "auto" }}
              // style={{ height: "100%" }}
              className="bg-dark card"
            >
              <div className="text-light card-body">
                <BidsAsk id_crypto={data.data.id} id={id} />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="bg-dark card">
              <div className="text-light card-body p-1">
                <PriceHeader id={id} obj={data.data} />
                <div className="chart">
                  <Chart id={id} />
                </div>
              </div>
            </div>
            {/* <div style={{ height: "100%" }} className="card bg-dark mt-1">
            <div className=" card-body">afsd</div>
          </div> */}
          </div>
          <div className="col-sm">
            <div className="bg-dark card">
              <div className=" card-body">afsd</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const map_data = (state) => {
  // console.log(state)
  return {
    data: state.crypto_data,
  };
};

export default connect(map_data)(Trade);
