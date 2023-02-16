import React from "react";

export default class BuySell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyUnits: 0,
      sellUnits: 0,
      buyPrice: 0,
      sellPrice: 0,
      unitsAvailable: 0,
      averageCost: 0,
    };
  }

  // after submit, the state will capture the buyunits
  handleSubmitBuy = (e) => {
    e.preventDefault();
    let isBalanceSufficient = false;
    // totalCost is to check on whether the available balance is sufficient
    const totalCost = this.state.buyUnits * this.state.buyPrice;

    // if its sufficient, we will give the status true to setstate unitsAvailable. Else, we will alert the user.
    if (this.currAvailableBalance > totalCost) {
      isBalanceSufficient = true;
    } else {
      alert("Insufficient Balance");
    }

    const newUnitsAvailable = this.state.buyUnits + this.state.unitsAvailable;

    const newAverageCost =
      (this.state.unitsAvailable * this.state.averageCost + totalCost) /
      newUnitsAvailable;

    this.setState({
      unitsAvailable: isBalanceSufficient
        ? newUnitsAvailable
        : this.state.unitsAvailable,
      averageCost: newAverageCost,
    });
  };

  handleChangeBuySell = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <form>
          {/* create two input box, one for buy and one for sell */}
          <label>Buy:</label>
          <input
            type="text"
            name="buy"
            value={this.state.buy}
            onChange={this.handleChangeBuySell}
          />
          <label>Sell:</label>
          <input
            type="text"
            name="sell"
            value={this.state.sell}
            onChange={this.handleChangeBuySell}
          />

          {/* create two input box, one for buying price and one for selling price*/}
          <label>Buy price:</label>
          <input
            type="text"
            name="buyPrice"
            value={this.state.buyPrice}
            onChange={this.handleChangeBuySell}
          />
          <label>Sell price:</label>
          <input
            type="text"
            name="sellPrice"
            value={this.state.sellPrice}
            onChange={this.handleChangeBuySell}
          />
        </form>
      </div>
    );
  }
}
