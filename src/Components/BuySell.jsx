import React from "react";
import Portfolio from "./Portfolio";

export default class BuySell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: 0,
      price: 0,
    };
  }

  // // after submit, the state will capture the buyunits
  // handleSubmitBuy = (e) => {
  //   e.preventDefault();
  //   let isBalanceSufficient = false;
  //   let newUnitsAvailable;
  //   let newAverageCost;
  //   let newCurrAvailableBalance;
  //   // totalCost is to check on whether the available balance is sufficient
  //   const totalCost = this.state.buyUnits * this.state.buyPrice;

  //   // if its sufficient, we will give the status true to setstate unitsAvailable. Else, we will alert the user.
  //   if (this.props.currAvailableBalance >= totalCost) {
  //     isBalanceSufficient = true;

  //     newUnitsAvailable = this.state.buyUnits + this.state.unitsAvailable;

  //     newAverageCost =
  //       (this.state.unitsAvailable * this.state.averageCost + totalCost) /
  //       newUnitsAvailable;

  //     newCurrAvailableBalance = this.props.currAvailableBalance - totalCost;
  //   } else {
  //     newCurrAvailableBalance = this.props.currAvailableBalance;
  //     alert("Insufficient Balance");
  //   }

  //   this.setState({
  //     unitsAvailable: isBalanceSufficient
  //       ? newUnitsAvailable
  //       : this.state.unitsAvailable,
  //     averageCost: isBalanceSufficient
  //       ? newAverageCost
  //       : this.state.averageCost,
  //     currAvailableBalance: isBalanceSufficient
  //       ? newCurrAvailableBalance
  //       : this.props.currAvailableBalance,
  //     buyUnits: 0,
  //     buyPrice: 0,
  //   });
  // };

  // Value in the input will be assigned and updated according to the name
  handleChangeBuySell = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: parseFloat(value),
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
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={this.state.price}
          onChange={this.handleChangeBuySell}
        />
        <button onClick={this.onClickBuyUnits}>Buy</button>
        <button onClick={this.onClickSellUnits}>Sell</button>
      </div>
    );
  }
}
