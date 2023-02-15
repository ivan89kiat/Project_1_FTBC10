import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Savings from "./Components/Savings";
import Portfolio from "./Components/Portfolio";
import CreatePortfolio from "./Components/CreatePortfolio";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolios: [
        {
          id: 0,
          title: "Apple Stock",
          unitsAvailable: 0,
          averageCost: 0,
          currentPrice: 0,
          performance: 0,
        },

        {
          id: 1,
          title: "Google Stock",
          unitsAvailable: 0,
          averageCost: 0,
          currentPrice: 0,
          performance: 0,
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <Savings />
            <br />
            Display Savings
          </div>

          <div>
            <h1>My Portfolio</h1>
            {this.state.portfolios && this.state.portfolios.length > 0 ? (
              this.state.portfolios.map((portfolio) => (
                <Portfolio key={portfolio.id} {...portfolio} />
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

          <div>Overall Performance</div>
        </header>
      </div>
    );
  }
}

export default App;
