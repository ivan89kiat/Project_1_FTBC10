import React from "react";

export default class Savings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      savings: 0,
      currAvailableBalance: 0,
      savingsEdit: false,
    };
  }

  handleSubmitSavings = (e) => {
    e.preventDefault();
    const newBalance = this.state.currAvailableBalance + this.state.savings;
    this.setState({
      savings: this.state.savings,
      currAvailableBalance: newBalance,
    });
  };

  handleChangeSavings = (e) => {
    const newSavings = parseInt(e.target.value);
    this.setState({
      savings: newSavings,
      savingsEdit: true,
    });
  };

  render() {
    const availableBalance = this.state.currAvailableBalance;
    return (
      <>
        <form onSubmit={this.handleSubmitSavings}>
          <input
            type="number"
            name="savings"
            value={this.state.savings}
            onChange={this.handleChangeSavings}
          />
          <input name="submit" type="submit" value="submit" />
        </form>
        <br />
        <p>Current Available Balance: $ {availableBalance}</p>
      </>
    );
  }
}
