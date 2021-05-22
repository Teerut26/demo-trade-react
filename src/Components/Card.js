import React, { Component } from "react";

export class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseVolume: 0,
      show: false,
    };
  }

  componentDidMount() {
    this.setState({ baseVolume: this.props.obj.data.baseVolume });
  }

  componentDidUpdate() {
    if (this.props.obj.data.baseVolume !== this.state.baseVolume && this.state.baseVolume != 0 ) {
      this.setState({ show: true });
      // console.log(this.state.show);
      this.setState({ baseVolume: this.props.obj.data.baseVolume });
      setTimeout(() => {
        this.setState({ show: false });
        // console.log(this.state.show);
      }, 500);
    }
  }

  commaNumber = (number) => {
    return number.toLocaleString();
  };

  nFormatter = (num, digits) => {
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
  };
  render() {
    return (
      <div>
        <a
          className={
            this.state.show
              ? "chang list-group-item list-group-item-action bg-dark text-light flex-column align-items-start"
              : "list-group-item list-group-item-action bg-dark text-light flex-column align-items-start"
          }
        >
          <div className="d-flex w-100 justify-content-between">
            <div className="row ">
              <div className="col">
                <h5 className="mb-0">
                  <img
                    src={
                      "https://www.bitkub.com/static/images/icons/" +
                      this.props.obj.symbol +
                      ".png"
                    }
                    width={30}
                    height={30}
                    alt
                    srcSet
                    style={{ paddingBottom: 4, paddingLeft: 4 }}
                  />{" "}
                  {this.props.obj.symbol}{" "}
                </h5>
              </div>
            </div>
            <h5 className="mb-0" style={{ float: "right" }}>
              {" "}
              {this.props.obj.data.last
                ? this.commaNumber(this.props.obj.data.last)
                : "0"}{" "}
            </h5>
          </div>
          <small>
            Vol :{" "}
            {this.props.obj.data.baseVolume
              ? this.nFormatter(this.props.obj.data.baseVolume, 1)
              : "0"}
          </small>
          <small style={{ float: "right" }}>
            <b
              className={
                this.props.obj.data.percentChange >= 0
                  ? "text-green"
                  : "text-red"
              }
            >
              {this.props.obj.data.percentChange
                ? this.props.obj.data.percentChange + " %"
                : "0 %"}
            </b>
          </small>
        </a>
      </div>
    );
  }
}

export default Card;
