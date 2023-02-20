import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Savings from "./Components/Savings";
import Portfolio from "./Components/Portfolio";
import CreatePortfolio from "./Components/CreatePortfolio";
import BuySell from "./Components/BuySell";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currAvailableBalance: 10000,
      portfolios: [
        {
          id: 0,
          title: "Apple",
          unitsAvailable: 0,
          averageCost: 0,
        },

        {
          id: 1,
          title: "Google",
          unitsAvailable: 0,
          averageCost: 0,
        },
      ],
    };
  }

  addPortfolio = (portfolio) => {
    const newPortfolio = [...this.state.portfolios, portfolio];
    this.setState({
      portfolios: newPortfolio,
    });
  };

  addSavings = (savings) => {
    const newSavings = this.state.currAvailableBalance + savings;
    this.setState({
      currAvailableBalance: newSavings,
    });
  };

  deductSavings = (savings) => {
    const newSavings = this.state.currAvailableBalance - savings;
    this.setState({
      currAvailableBalance: newSavings,
    });
  };

  // getNewBalance = (units, price, isBuy) => {
  //   const transactionAmount = units * price;
  //   if (transactionAmount > this.state.currAvailableBalance && isBuy) {
  //     return alert("Insufficient Balance");
  //   }
  //   if (transactionAmount < this.state.currAvailableBalance && isBuy) {
  //     return this.state.currAvailableBalance - transactionAmount;
  //   }
  //   return this.state.currAvailableBalance + transactionAmount;
  // };

  // deductBalanceToBuy = (units, price) => {
  //   const newBalance = this.getNewBalance(units, price, true);
  //   // const buyCost = units * price;
  //   // if (buyCost > this.state.currAvailableBalance) {
  //   //   return alert("Insufficient Fund");
  //   // }

  //   // const newBalance =
  //   //   buyCost > this.state.currAvailableBalance
  //   //     ? this.state.currAvailableBalance
  //   //     : this.state.currAvailableBalance - buyCost;
  //   this.setState({
  //     currAvailableBalance: newBalance,
  //   });
  // };

  // addBalanceAfterSell = (units, price) => {
  //   const newBalance = this.getNewBalance(units, price, false);
  //   // const sellCost = units * price;
  //   // const newBalance = this.state.currAvailableBalance + sellCost;
  //   this.setState({
  //     currAvailableBalance: newBalance,
  //   });
  // };

  render() {
    const { currAvailableBalance } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <Savings
              addSavings={this.addSavings}
              deductSavings={this.deductSavings}
            />
            Available Balance: ${currAvailableBalance}
          </div>

          <div>
            <h1>My Portfolio</h1>
            {this.state.portfolios && this.state.portfolios.length > 0 ? (
              this.state.portfolios.map((portfolio) => (
                <Portfolio
                  key={portfolio.id}
                  {...portfolio}
                  currAvailableBalance={currAvailableBalance}
                />
              ))
            ) : (
              <p>Create Portfolio</p>
            )}
            <br />
            <CreatePortfolio
              portfoliosLength={this.state.portfolios.length}
              addPortfolio={this.addPortfolio}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
