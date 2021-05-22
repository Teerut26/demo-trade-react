import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const commaNumber = (number) => {
  try {
    return number.toLocaleString();
  } catch {
    return "--";
  }
};

function SymbolAll(props) {
  const [data, setdata] = useState(props.data);
  const history = useHistory();
  const [Search, setSearch] = useState("")

  // const handleSearch = (value) => {
    
  //   let result = [];
  //   result = data2.filter((item) => {
  //     return item.symbol.search(value) !== -1;
  //   });
  //   if (result.length != 0) {
  //     setData2(result);
  //   }
  // };

  useEffect(() => {
    if (Search.length > 0) {
      let result = [];
      result = data.filter((item) => {
          return item.symbol.search(Search) !== -1;
      });
      setdata(result);
    }else{
      setdata(props.data);
    }
    // console.log(Search.length)
  }, [props.data])

  // useEffect(() => {
  //   setdata(props.data);
  // }, [props.data]);

  return (
    <div>
      <div classname="bg-dark card">
        <div classname=" card-body">
          <table className="table text-light table-borderless">
            <thead>
              <tr>
                <th scope="col">
                  <input
                    style={{ height: "21px" }}
                    type="email"
                    className="form-control bg-dark text-light"
                    value={Search}
                    onChange={(v)=>setSearch(v.target.value)}
                  />
                </th>
                <th style={{ "font-size": "13px" }} scope="col">
                  Price (THB)
                </th>
                <th style={{ "font-size": "13px" }} scope="col">
                  Change
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <Trchange
                  click={(v) => history.push(v)}
                  baseValue={item.data.last}
                  obj={item}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const map_data = (state) => {
  return {
    data: state.crypto_data,
  };
};

export default connect(map_data)(SymbolAll);

class Trchange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseValue: 0,
      show: false,
    };
  }

  componentDidMount() {
    this.setState({ baseValue: this.props.baseValue });
  }

  componentDidUpdate() {
    if (
      this.props.baseValue !== this.state.baseValue &&
      this.state.baseValue != 1
    ) {
      this.setState({ show: true });
      // console.log(this.state.show);
      this.setState({ baseValue: this.props.baseValue });
      setTimeout(() => {
        this.setState({ show: false });
        // console.log(this.state.show);
      }, 200);
    }
  }
  render() {
    return (
      <tr
        onClick={() => this.props.click(`/trade/${this.props.obj.symbol}`)}
        className={this.state.show ? "text-tiker" : ""}
      >
        <th
          className="text-light"
          style={{ "font-size": "13px", padding: "5px" }}
        >
          <img
            width="20"
            height="20"
            src={`https://www.bitkub.com/static/images/icons/${this.props.obj.symbol}.png`}
          ></img>
          &nbsp;&nbsp; {this.props.obj.symbol}
        </th>
        <td
          style={{ "font-size": "13px", padding: "5px" }}
          className="text-green"
        >
          {commaNumber(this.props.obj.data.last)}
        </td>
        <td
          style={{ "font-size": "13px", padding: "5px" }}
          className={
            this.props.obj.data.percentChange >= 0 ? "text-green" : "text-red"
          }
        >
          {this.props.obj.data.percentChange
            ? this.props.obj.data.percentChange + "%"
            : "---"}
        </td>
      </tr>
    );
  }
}
