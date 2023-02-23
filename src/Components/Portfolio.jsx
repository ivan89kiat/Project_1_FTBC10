import React from "react";
import BuySell from "./BuySell";
import { Card, CardActions, CardContent, Button } from "@mui/material";
import "../App.css";
// balance check is necessary for the buy units to ensure the user has enough balance
let balanceCheck = false;
class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availableUnits: 0,
      totalInvestment: 0,
      averageCost: 0,
      currAvailableBalance: this.props.currAvailableBalance,
    };
  }

  // average cost will change when there is buy units coming in. it should not change when the user sell units.
  getNewAverageCost = (units, price, newUnits, isBuy) => {
    const currTotalCost = units * price;
    const prevTotalCost = this.state.availableUnits * this.state.averageCost;
    if (isBuy) {
      return (currTotalCost + prevTotalCost) / newUnits;
    }
    return this.state.averageCost;
  };

  // method created to take in the click event "buy" from buysell component, which units and price data will pass into this component to execute the logic in sellUnits

  buyUnits = (units, price) => {
    if (balanceCheck === true) {
      const newUnits = this.state.availableUnits + units;
      const newAverageCost = this.getNewAverageCost(
        units,
        price,
        newUnits,
        true
      );
      const totalInvestment = newUnits * newAverageCost;

      this.setState({
        availableUnits: newUnits,
        averageCost: newAverageCost,
        totalInvestment: totalInvestment,
      });
    }
    // balancecheck will return to false when the codes above executed, so that we can always keep the balance in checked
    return (balanceCheck = false);
  };

  // method created to take in the click event "sell" from buysell component, which units and price data will pass into this component to execute the logic in sellUnits

  sellUnits = (units, price) => {
    const prevTotalCost = this.state.availableUnits * this.state.averageCost;
    const newUnits = this.state.availableUnits - units;
    const currTotalCost = units * price;
    const newAverageCost =
      newUnits === 0
        ? 0
        : this.getNewAverageCost(units, price, newUnits, false);
    const totalInvestment =
      newAverageCost === 0 || currTotalCost > prevTotalCost
        ? 0
        : prevTotalCost - currTotalCost;

    this.setState({
      availableUnits: newUnits,
      averageCost: newAverageCost,
      totalInvestment: totalInvestment,
    });
  };

  // this will update the available balance, it will check if the transaction amount is higher or lower than the available balance. if the transaction amount is higher, alert will be prompted.

  getNewBalance = (units, price, isBuy) => {
    const transactionAmount = units * price;
    if (transactionAmount > this.props.currAvailableBalance && isBuy) {
      alert("Insufficient Balance");

      // returned this.props.currAvailableBalance so that it will not go undefined
      return this.props.currAvailableBalance;
    }

    // if passed 1st condition, 2nd condition will be checked, if conditions met, balancecheck will be declared true. balance will be updated.
    if (isBuy) {
      balanceCheck = true;
      return this.props.currAvailableBalance - transactionAmount;

      // last condition is when isBuy is false which is coming from sellUnits, the balance will be updated after units sold.
    }
    return this.props.currAvailableBalance + transactionAmount;
  };

  deductBalanceToBuy = (units, price) => {
    const newBalance = this.getNewBalance(units, price, true);
    this.setState({
      currAvailableBalance: newBalance,
    });
    this.props.updateBalanceAfterTransaction(newBalance);
  };

  addBalanceAfterSell = (units, price) => {
    const newBalance = this.getNewBalance(units, price, false);
    this.setState({
      currAvailableBalance: newBalance,
    });
    this.props.updateBalanceAfterTransaction(newBalance);
  };

  render() {
    return (
      <div className="portfolio">
        <Card
          variant="outlined"
          style={{ backgroundColor: "#FFE15D" }}
          display="inlined"
        >
          <CardContent>
            <h2>Stock Name: {this.props.title}</h2>
            <h5>Units Available: {this.state.availableUnits} units</h5>
            <h5>Average Cost: $ {this.state.averageCost}</h5>
            <h5>Total Investment: $ {this.state.totalInvestment}</h5>
          </CardContent>
          <CardActions>
            <div className="buySellInput">
              <BuySell
                buyUnits={this.buyUnits}
                sellUnits={this.sellUnits}
                addBalanceAfterSell={this.addBalanceAfterSell}
                deductBalanceToBuy={this.deductBalanceToBuy}
                handleSavePortfolioData={this.handleSavePortfolioData}
              />
            </div>
          </CardActions>
          <CardActions style={{ backgroundColor: "#F2921D" }}>
            <Button
              size="small"
              onClick={() => this.props.deletePortfolio(this.props.id)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
        <br />
      </div>
    );
  }
}

export default Portfolio;
