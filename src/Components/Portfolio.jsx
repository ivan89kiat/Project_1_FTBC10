import React from "react";

class Portfolio extends React.Component {
  render() {
    return (
      <div>
        <h2>Stock Name: {this.props.title}</h2>
        <h3>Units Available: {this.props.unitsAvailable} units</h3>
        <h3>Average Cost: $ {this.props.averageCost}</h3>
        <h3>Current Price: $ {this.props.currentPrice}</h3>
        <h3>Performance: {this.props.performance} %</h3>
      </div>
    );
  }
}

export default Portfolio;
