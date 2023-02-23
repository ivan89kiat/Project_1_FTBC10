import logo from "./images/logo.png";
import "./App.css";
import React from "react";
import Savings from "./Components/Savings";
import Portfolio from "./Components/Portfolio";
import CreatePortfolio from "./Components/CreatePortfolio";
import { Card } from "@mui/material";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currAvailableBalance: 0,
      portfolios: [],
    };
  }

  // Save portfolio to local storage
  handleSavePortfolio = () => {
    localStorage.setItem("My Portfolio", JSON.stringify(this.state.portfolios));
    localStorage.setItem(
      "Balance",
      JSON.stringify(this.state.currAvailableBalance)
    );
  };

  // Retrieve portfolio from local storage, this button can be modified to happen together when user login
  handleRetrievePortfolio = () => {
    const newPortfolios = JSON.parse(
      localStorage.getItem("My Portfolio", this.state.portfolios)
    );
    const newBalance = JSON.parse(
      localStorage.getItem("Balance", this.state.currAvailableBalance)
    );
    this.setState({
      portfolios: newPortfolios,
      currAvailableBalance: newBalance,
    });
  };

  // Create new portfolio
  addPortfolio = (portfolio) => {
    const newPortfolio = [...this.state.portfolios, portfolio];
    this.setState({
      portfolios: newPortfolio,
    });
  };

  // Delete a portfolio
  deletePortfolio = (id) => {
    const index = this.state.portfolios.findIndex(
      (portfolio) => portfolio.id === id
    );

    const newArray = [...this.state.portfolios];
    newArray.splice(index, 1);
    this.setState({
      portfolios: newArray,
    });
  };

  // Update balance whenever savings was deposited in the Savings component
  addSavings = (savings) => {
    const newSavings = this.state.currAvailableBalance + savings;
    this.setState({
      currAvailableBalance: newSavings,
    });
  };

  // Update balance whenever savings was withdrawn in the Savings component
  deductSavings = (savings) => {
    const newSavings =
      this.state.currAvailableBalance <= 0
        ? 0
        : this.state.currAvailableBalance - savings;
    this.setState({
      currAvailableBalance: newSavings,
    });
  };

  // Update the balance after transaction happened in the Portfolio component
  updateBalanceAfterTransaction = (updatedBalance) => {
    this.setState({
      currAvailableBalance: updatedBalance,
    });
  };

  render() {
    const { currAvailableBalance } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="title">The GoldPot</p>
          <div className="displaySavings">
            Current Balance: ${currAvailableBalance}
            <br />
            <Savings
              currAvailableBalance={currAvailableBalance}
              addSavings={this.addSavings}
              deductSavings={this.deductSavings}
            />
          </div>
          <div className="updatePortfolio">
            <button className="button" onClick={this.handleSavePortfolio}>
              Save Portfolio
            </button>
            <button className="button" onClick={this.handleRetrievePortfolio}>
              Retrieve Portfolio
            </button>
          </div>
          <div className="portfolio">
            <h1>Portfolio</h1>
            <div>
              <CreatePortfolio
                portfoliosLength={this.state.portfolios.length}
                addPortfolio={this.addPortfolio}
              />
            </div>
            <Card variant="outlined">
              {this.state.portfolios && this.state.portfolios.length > 0 ? (
                this.state.portfolios.map((portfolio) => (
                  <Portfolio
                    key={portfolio.id}
                    {...portfolio}
                    currAvailableBalance={currAvailableBalance}
                    updateBalanceAfterTransaction={
                      this.updateBalanceAfterTransaction
                    }
                    deletePortfolio={this.deletePortfolio}
                    updatePortfolio={this.updatePortfolio}
                  />
                ))
              ) : (
                <p>Create Portfolio</p>
              )}
            </Card>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
