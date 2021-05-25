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

const compare = (a, b) => {
  if (a[1] < b[1]) {
    return -1;
  }
  if (a[1] > b[1]) {
    return 1;
  }
  return 0;
};

const Loading = () => {
  return (
    <div>
      <div style={{ width: 60 }} className="ssc-line mb-3"></div>
      {[...Array(50)].map((x, i) => (
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

export class BidsAsk extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bids: [],
      asks: [],
      socket: new WebSocket(
        `wss://wsdesktop.bitkub.com/websocket-market-api/${this.props.id_crypto}`
      ),
      wssOn: false,
    };
  }

  get_books = async () => {
    const res = await fetch(
      `https://api.bitkub.com/api/market/books?sym=THB_${this.props.id}&lmt=30`
    );
    const data = await res.json();
    var bids = [];
    var asks = [];
    try{
      for (let index = 0; index < data.result.bids.length; index++) {
        bids.push([
          data.result.bids[index][2],
          data.result.bids[index][3],
          data.result.bids[index][4],
        ]);
      }
      for (let index = 0; index < data.result.asks.length; index++) {
        asks.push([
          data.result.bids[index][2],
          data.result.bids[index][3],
          data.result.bids[index][4],
        ]);
      }
      this.setState({ bids: bids });
      this.setState({ asks: asks });
      this.setState({ wssOn: true });
    }catch {

    }
    
  };

  wssOnmessage = () => {
    this.state.socket.onmessage = (event) => {
      if (JSON.parse(event.data).event === "bidschanged") {
        let data = JSON.parse(event.data);
        this.setState({ bids: data.data });
      } else if (JSON.parse(event.data).event === "askschanged") {
        let data = JSON.parse(event.data);
        this.setState({ asks: data.data.sort() });
        
      }
    };
  };

  componentDidMount() {
    this.get_books();
    this.wssOnmessage();
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  render() {
    return (
      <div>
        {this.state.wssOn != true ? (
          <Loading />
        ) : (
          <div>
            <h6>Asks</h6>
            <table className="table-borderless table text-light">
              <thead>
                <tr>
                  <th style={{ "font-size": "13px",color:"#8096a0" }} scope="col">
                    Vol (THB)
                  </th>
                  <th style={{ "font-size": "13px",color:"#8096a0" }} scope="col">
                    Vol ({this.props.id})
                  </th>
                  <th style={{ "font-size": "13px",color:"#8096a0" }} scope="col">
                    Rate (THB)
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.asks.map(
                  (item) =>
                    this.state.wssOn ? (
                      <Trchange color="text-red" vol={item} />
                    ) : (
                      <i class="fas fa-circle-notch fa-spin"></i>
                    )
                  // <Trchange vol={item} />
                )}
              </tbody>
            </table>
            <h6>Bids</h6>
            <table className="table-borderless table text-light">
              <thead>
                <tr>
                  <th style={{ "font-size": "13px",color:"#8096a0" }} scope="col">
                    Vol (THB)
                  </th>
                  <th style={{ "font-size": "13px",color:"#8096a0" }} scope="col">
                    Vol ({this.props.id})
                  </th>
                  <th style={{ "font-size": "13px",color:"#8096a0" }} scope="col">
                    Rate (THB)
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.asks.map(
                  (item) =>
                    this.state.wssOn ? (
                      <Trchange color="text-green" vol={item} />
                    ) : (
                      <i class="fas fa-circle-notch fa-spin"></i>
                    )
                  // <Trchange vol={item} />
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default BidsAsk;

class Trchange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vol: 0,
      show: false,
    };
  }

  componentDidMount() {
    this.setState({ vol: this.props.vol[1] });
  }

  componentDidUpdate() {
    if (this.props.vol[1] !== this.state.vol && this.state.vol != 1) {
      this.setState({ show: true });
      // console.log(this.state.show);
      this.setState({ vol: this.props.vol[1] });
      setTimeout(() => {
        this.setState({ show: false });
        // console.log(this.state.show);
      }, 200);
    }
  }
  render() {
    return (
      <tr className={this.state.show ? "text-tiker" : ""}>
        <th style={{ "font-size": "13px", padding: "3px" }}>
          {commaNumber(this.props.vol[0],2)}
        </th>
        <th style={{ "font-size": "13px", padding: "3px" }}>
          {commaNumber(this.props.vol[2],8)}
        </th>
        <th
          style={{ "font-size": "13px", padding: "3px" }}
          className={this.props.color}
        >
          {commaNumber(this.props.vol[1],2)}
        </th>
      </tr>
    );
  }
}
