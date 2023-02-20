import React from "react";
import BuySell from "./BuySell";

export default class Savings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      savings: 0,
      savingsEdit: false,
    };
  }

  handleChangeSavings = (e) => {
    const newSavings = parseInt(e.target.value);
    this.setState({
      savings: newSavings,
      savingsEdit: true,
    });
  };

  onClickAddSavings = () => {
    this.props.addSavings(this.state.savings);
  };

  onClickDeductSavings = () => {
    this.props.deductSavings(this.state.savings);
  };

  render() {
    // const availableBalance = this.state.currAvailableBalance;
    return (
      <>
        <input
          type="text"
          name="savings"
          value={this.state.savings}
          onChange={this.handleChangeSavings}
        />
        <button onClick={this.onClickAddSavings}>+</button>
        <button onClick={this.onClickDeductSavings}>-</button>

        <br />
      </>
    );
  }
}
