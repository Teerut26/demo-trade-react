import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./Card";

import { Link } from "react-router-dom";

export class CardHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data_from_url: null,
      data3: null,
    };
  }

  componentDidMount(){
    document.title = "DEMO TRADE"
  }

  resetStore = () => {
    this.props.dispatch({
      type: "DELETE_ALL",
      data: [],
    });
  };

  componentWillUnmount(){
    
  }

  componentWillUnmount() {
    // this.resetStore();
  }

  render() {
    return (
      <div>
        {/* <button onClick={this.resetStore()}>WssClose</button> */}
        <ul class="ex4 list-group mt-3">
          {this.props.data.map((item,index) => (
            <Link key={index} to={"/trade/" + item.symbol}>
              <Card obj={item} />
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

const map_data = (state) => {
  return {
    data: state.crypto_data,
  };
};

export default connect(map_data)(CardHeader);
