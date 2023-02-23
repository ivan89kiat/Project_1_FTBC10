import React from "react";
import "../App.css";

export default class Savings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      savings: 0,
    };
  }

  handleChangeSavings = (e) => {
    const newSavings = parseInt(e.target.value || 0);
    this.setState({
      savings: newSavings,
    });
  };

  // when click event happened, method addSavings & deductSavings will be executed and savings state in this component will pass the data to the parent component
  onClickAddSavings = () => {
    this.props.addSavings(this.state.savings);
  };

  onClickDeductSavings = () => {
    this.props.deductSavings(this.state.savings);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="savings"
          value={this.state.savings}
          onChange={this.handleChangeSavings}
        />
        <button onClick={this.onClickAddSavings}>+</button>
        <button onClick={this.onClickDeductSavings}>-</button>

        <br />
      </div>
    );
  }
}
