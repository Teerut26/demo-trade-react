import React from "react";
import { useEffect, useState } from "react";
// import GetRouter from "../Components/GetRouter";
import { connect } from "react-redux";
import { useParams } from "react-router";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import BidsAsk from "../Components/BidsAsk";
import PriceHeader from "../Components/PriceHeader";
import SymbolAll from "../Components/SymbolAll";



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
  const [value, setValue] = useState(0);

  const [idCrypto, setIdCrypto] = useState(null)

  // const useForceUpdate = () => {
  //   ;
  // }

  useEffect(() => {
    props.data.map((item) => {
      if (item.symbol === id) {
        setdata(item);
      }
    });
  }, [props.data]);

  useEffect(() => {
    if (data != null) {
      setShow(true);
    }
  }, [data]);

  useEffect(() => {
    setValue(value => value + 1)
    props.data.map((item) => {
      if (item.symbol === id) {
        setdata(item);
      }
    });
  }, [id])

  return (
    <div key={value} className="px-1  mt-1">
      {show ? (
        <div
          style={{
            height: "calc(100vh - 80px)",
            marginLeft: 0,
            marginRight: 0,
          }}
          className="row "
        >
          <div style={{ padding:0 }} className="col-sm mb-1">
            <div
              style={{ height: "calc(100vh - 68px)", overflow: "auto" }}
              className="bg-dark card"
            >
              <div  className="text-light card-body">
                <BidsAsk id_crypto={data.data.id} id={id} />
              </div>
            </div>
          </div>
          <div style={{ padding:0 }} className="col-sm-6 px-1 mb-1">
            <div className="bg-dark card">
              <div className="text-light card-body p-1">
                <PriceHeader id={id} obj={data.data} />
                <div className="chart">
                  <Chart id={id} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding:0 }} className="col-sm mb-1">
            <div
              style={{ height: "calc(100vh - 68px)", overflow: "auto" }}
              className="bg-dark card"
            >
              <div className="text-light card-body">
                <SymbolAll />
              </div>
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
