import React, { Component } from "react";

const commaNumber = (number, n) => {
  try {
    return number.toLocaleString();
  } catch {
    return <i class="fas fa-circle-notch fa-spin"></i>;
  }
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
      `https://api.bitkub.com/api/market/books?sym=THB_${this.props.id}&lmt=10`
    );
    const data = await res.json();
    // var bids = [];
    // for (let index = 0; index < data.result.bids.length; index++) {
    //   var obj = [];
    //   for (let index2 = 2; index2 < data.result.bids[index].length; index2++) {
    //     obj.push(data.result.bids[index][index2]);
    //   }
    //   bids.push(obj);
    // }

    // var asks = [];
    // for (let index = 0; index < data.result.asks.length; index++) {
    //   var obj = [];
    //   for (let index2 = 2; index2 < data.result.asks[index].length; index2++) {
    //     obj.push(data.result.asks[index][index2]);
    //   }
    //   asks.push(obj);
    // }

    // this.setState({ bids: data.result.bids });
    // this.setState({ asks: data.result.asks });
    // this.setState({ get_api: false });
  };

  wssOnmessage = () => {
    this.state.socket.onmessage = (event) => {
      if (JSON.parse(event.data).event === "bidschanged") {
        let data = JSON.parse(event.data);
        this.setState({ bids: data.data });
      } else if (JSON.parse(event.data).event === "askschanged") {
        let data = JSON.parse(event.data);
        this.setState({ asks: data.data.sort() });
        this.setState({ wssOn: true });
      }
    };
  };

  componentDidMount() {
    this.get_books();
    this.wssOnmessage();
    // setInterval(() => {
    //   this.get_books()
    // }, 10000);
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  render() {
    return (
      <div>
        {this.state.wssOn != true ? <Loading /> :
        <div>
        <h6>Asks</h6>
        <table className="table-borderless table text-light">
          <thead>
            <tr>
              <th style={{ "font-size": "13px" }} scope="col">
                Vol (THB)
              </th>
              <th style={{ "font-size": "13px" }} scope="col">
                Vol ({this.props.id})
              </th>
              <th style={{ "font-size": "13px" }} scope="col">
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
              <th style={{ "font-size": "13px" }} scope="col">
                Vol (THB)
              </th>
              <th style={{ "font-size": "13px" }} scope="col">
                Vol ({this.props.id})
              </th>
              <th style={{ "font-size": "13px" }} scope="col">
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
        </table></div>}
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
          {this.props.vol[0]}
        </th>
        <th style={{ "font-size": "13px", padding: "3px" }}>
          {this.props.vol[2]}
        </th>
        <th
          style={{ "font-size": "13px", padding: "3px" }}
          className={this.props.color}
        >
          {this.props.vol[1]}
        </th>
      </tr>
    );
  }
}
