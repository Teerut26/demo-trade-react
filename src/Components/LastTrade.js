import React, { Component } from "react";

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

const updateClock = (data) => {
  var time = new Date(data * 1000);
  var newDate = new Date();
  var startStamp = new Date(time);
  var newStamp = newDate.getTime();
  var diff = Math.round((newStamp - startStamp.getTime()) / 1000);
  var d = Math.floor(
    diff / (24 * 60 * 60)
  ); /* though I hope she won't be working for consecutive days :) */
  diff = diff - d * 24 * 60 * 60;
  var h = Math.floor(diff / (60 * 60));
  diff = diff - h * 60 * 60;
  var m = Math.floor(diff / 60);
  diff = diff - m * 60;
  var s = diff;
  if (d > 0) {
    return d + " วันที่ผ่านมา";
  } else if (d == 0 && h != 0 && m != 0 && s != 0) {
    return h + " ชั่วโมงที่ผ่านมา";
  } else if (h == 0 && m != 0 && s != 0) {
    return m + " mins";
  } else if (m == 0 && s != 0) {
    if (s < 10) {
      return " just now";
    }
    return s + " secs";
  }
  // return d + " day(s), " + h + " hour(s), " + m +
  //     " minute(s), " + s + " second(s) working";
};

const Loading = () => {
  return (
    <div>
      {/* <div style={{ width: 60 }} className="ssc-line mb-3"></div> */}
      {[...Array(40)].map((x, i) => (
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

export class LastTrade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error:false,
      data: [],
      show: false,
      socket: new WebSocket(
        `wss://wsdesktop.bitkub.com/websocket-market-api/${this.props.crypto_id}`
      ),
    };
  }

  getFrist = async () => {
    const res = await fetch(
      `https://api.bitkub.com/api/market/trades?sym=THB_${this.props.id}&lmt=50`
    );
    const data = await res.json();
    // console.log(data.result);
    this.setState({ data: data.result });
    this.setState({show:true})
  };

  wssOnmessage = () => {
    this.state.socket.onmessage = (event) => {
      if (JSON.parse(event.data).event === "tradeschanged") {
        let data = JSON.parse(event.data);
        this.setState({ data: data.data[0] });
      }
    };
  };

  componentDidMount() {
    this.getFrist();
    this.wssOnmessage();
    
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  render() {
    return (
      <div>
        {this.state.show ?
        <table className="table-borderless table text-light">
          <thead>
            <tr>
              <th style={{ "font-size": "13px", color: "#8096a0" }} scope="col">
                Time
              </th>
              <th style={{ "font-size": "13px", color: "#8096a0" }} scope="col">
                Rate (THB)
              </th>
              <th style={{ "font-size": "13px", color: "#8096a0" }} scope="col">
                Vol ({this.props.id})
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data != null ? this.state.data.map((item) => (
              <Change item={item} time={item[0]} />
            )) : this.setState({show:false})}
          </tbody>
        </table>
        : <Loading />}
      </div>
    );
  }
}

export default LastTrade;

class Change extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      show: false,
    };
  }

  componentDidMount() {
    this.setState({ time: this.props.time });
  }

  componentDidUpdate() {
    if (this.props.time !== this.state.time && this.state.time != 1 ) {
      this.setState({ show: true });
      // if (this.props.time - this.state.time < 11) {
        
      // }
      this.setState({ time: this.props.time });
      setTimeout(() => {
        this.setState({ show: false });
      }, 200);
    }
  }
  render() {
    return (
      <tr className={this.state.show ? "text-tiker" : ""}>
        <td
          className={this.props.item[3] === "BUY" ? "text-green" : "text-red"}
          style={{ padding: 3, fontSize: 13 }}
        >
          {updateClock(this.props.item[0])}
        </td>
        <td style={{ padding: 3, fontSize: 13 }}> {commaNumber(this.props.item[1], 1)}</td>
        <td style={{ padding: 3, fontSize: 13 }}>{commaNumber(this.props.item[2], 8)}</td>
      </tr>
    );
  }
}
