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

  handleSavePortfolio = () => {
    localStorage.setItem("My Portfolio", JSON.stringify(this.state.portfolios));
  };

  handleRetrievePortfolio = () => {
    const newPortfolios = JSON.parse(
      localStorage.getItem("My Portfolio", this.state.portfolios)
    );
    this.setState({
      portfolios: newPortfolios,
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
              SavePortfolio
            </button>
            <button className="button" onClick={this.handleRetrievePortfolio}>
              Retrieve Portfolio
            </button>
          </div>
          <div className="portfolio">
            <h1>Portfolio</h1>
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
                  />
                ))
              ) : (
                <p>Create Portfolio</p>
              )}
            </Card>
          </div>
          <div>
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
