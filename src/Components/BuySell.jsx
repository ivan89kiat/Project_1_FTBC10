import React from "react";
import Portfolio from "./Portfolio";
import "../App.css";

export default class BuySell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: 0,
      price: 0,
    };
  }

  // Value in the input will be assigned and updated according to the name
  handleChangeBuySell = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: parseFloat(value || 0),
    });
  };

  // when "buy" click event happened, input will be collected and passed and method buyUnits in Portfolio component will be executed.
  onClickBuyUnits = () => {
    this.props.deductBalanceToBuy(this.state.units, this.state.price);
    this.props.buyUnits(this.state.units, this.state.price);
  };

  // when "sell" click event happened, input will be collected and passed and method sellUnits in Portfolio component will be executed.
  onClickSellUnits = () => {
    this.props.addBalanceAfterSell(this.state.units, this.state.price);
    this.props.sellUnits(this.state.units, this.state.price);
  };

  render() {
    return (
      <div>
        <label>Units:</label>
        <input
          type="text"
          name="units"
          value={this.state.units}
          onChange={this.handleChangeBuySell}
        />
        <br />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={this.state.price}
          onChange={this.handleChangeBuySell}
        />
        <br />
        <button className="button" onClick={this.onClickBuyUnits}>
          Buy
        </button>
        <button className="button2" onClick={this.onClickSellUnits}>
          Sell
        </button>
      </div>
    );
  }
}
