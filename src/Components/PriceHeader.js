import React, { Component } from "react";

const commaNumber = (number, n) => {
  try {
    return number.toLocaleString();
  } catch {
    return <i class="fas fa-circle-notch fa-spin"></i>;
  }
};

const nFormatter = (num, digits) => {
  try {
    var si = [
      {
        value: 1,
        symbol: "",
      },
      {
        value: 1e3,
        symbol: "k",
      },
      {
        value: 1e6,
        symbol: "M",
      },
      {
        value: 1e9,
        symbol: "G",
      },
      {
        value: 1e12,
        symbol: "T",
      },
      {
        value: 1e15,
        symbol: "P",
      },
      {
        value: 1e18,
        symbol: "E",
      },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  } catch {
    return <i class="fas fa-circle-notch fa-spin"></i>;
  }
};

const perCheck = (per) => {
  try {
    if (per >= 0) {
      return true;
    } else {
      return false;
    }
  } catch {}
};

export class PriceHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    document.title = `${commaNumber(this.props.obj.last, 2)} ${
      this.props.id
    }/THB`;
  }

  componentDidUpdate() {
    document.title = `${commaNumber(this.props.obj.last, 2)} ${
      this.props.id
    }/THB`;
  }

  render() {
    return (
      <div>
        <div className="d-flex flex-wrap flex-row bd-highlight">
          <div
            style={{ transform: "translate(0, 8px)" }}
            className="p-1 align-middle bd-highlight"
          >
            <img
              src={`https://www.bitkub.com/static/images/icons/${this.props.id}.png`}
            ></img>{" "}
            {`THB/${this.props.id}`}
          </div>
          <div className="p-1 align-middle bd-highlight">
            <font style={{ color: "#8096a0", "font-size": 13 }}>
              Last Price (THB)
            </font>
            <br />
            {this.props.obj.last ? (
              <PriceText price={this.props.obj.last} />
            ) : (
              <div class="ssc-line"></div>
            )}

            {/* <font className="text-green">
              {this.commaNumber(this.props.obj.last, 2)}
            </font> */}
          </div>
          <div className="p-1 align-middle bd-highlight">
            <font style={{ color: "#8096a0", "font-size": 13 }}>24 Change</font>
            <br />
            {this.props.obj.percentChange ? (
              <PerChange percent={this.props.obj.percentChange} />
            ) : (
              <div class="ssc-line"></div>
            )}
          </div>
          <div className="p-1 align-middle bd-highlight">
            <font style={{ color: "#8096a0", "font-size": 13 }}>24 High</font>
            <br />
            {this.props.obj.high24hr ? (
              <font className="text-green">
                {commaNumber(this.props.obj.high24hr)}
              </font>
            ) : (
              <div class="ssc-line"></div>
            )}
          </div>
          <div className="p-1 align-middle bd-highlight">
            <font style={{ color: "#8096a0", "font-size": 13 }}>24 Low</font>
            <br />
            {this.props.obj.low24hr ? (
              <font className="text-danger">
              {commaNumber(this.props.obj.low24hr)}
            </font>
            ) : (
              <div class="ssc-line"></div>
            )}
            
          </div>
          <div className="p-1 align-middle bd-highlight">
            <font style={{ color: "#8096a0", "font-size": 13 }}>
              24 Volume ({this.props.id})
            </font>
            <br />
            {this.props.obj.baseVolume ? (
              <VolumeChange volume={this.props.obj.baseVolume} />
            ) : (
              <div class="ssc-line"></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PriceHeader;

class PriceText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0,
      show: false,
    };
  }

  componentDidMount() {
    this.setState({ price: this.props.price });
  }

  componentDidUpdate() {
    if (this.props.price !== this.state.price && this.state.price != 0) {
      this.setState({ show: true });
      // console.log(this.state.show);
      this.setState({ price: this.props.price });
      setTimeout(() => {
        this.setState({ show: false });
        // console.log(this.state.show);
      }, 300);
    }
  }
  render() {
    return (
      <div>
        <font
          className={this.state.show ? "text-green text-tiker" : "text-green"}
        >
          {commaNumber(this.props.price, 2)}
        </font>
      </div>
    );
  }
}

class PerChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: 0,
      show: false,
    };
  }

  componentDidMount() {
    this.setState({ percent: this.props.percent });
  }

  componentDidUpdate() {
    if (this.props.percent !== this.state.percent && this.state.percent != 0) {
      this.setState({ show: true });
      // console.log(this.state.show);
      this.setState({ percent: this.props.percent });
      setTimeout(() => {
        this.setState({ show: false });
        // console.log(this.state.show);
      }, 300);
    }
  }
  render() {
    return (
      <div>
        <font
          className={this.state.show ? "text-green text-tiker" : "text-green"}
        >
          {perCheck(this.props.percent) ? (
            <font className="text-green">
              <i class="fas fa-caret-up"></i> {this.props.percent}
            </font>
          ) : (
            <font className="text-red">
              <i class="fas fa-caret-down"></i> {this.props.percent}
            </font>
          )}
        </font>
      </div>
    );
  }
}

class VolumeChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 0,
      show: false,
    };
  }

  componentDidMount() {
    this.setState({ volume: this.props.volume });
  }

  componentDidUpdate() {
    if (this.props.volume !== this.state.volume && this.state.volume != 0) {
      this.setState({ show: true });
      // console.log(this.state.show);
      this.setState({ volume: this.props.volume });
      setTimeout(() => {
        this.setState({ show: false });
        // console.log(this.state.show);
      }, 300);
    }
  }
  render() {
    return (
      <div>
        <font
          className={this.state.show ? "text-green text-tiker" : "text-green"}
        >
          <font className="text-green">
            {commaNumber(this.props.volume, 5)}
          </font>
        </font>
      </div>
    );
  }
}
