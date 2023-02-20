import React from "react";

class CreatePortfolio extends React.Component {
  constructor(props) {
    super(props);
    // Basic state available in a newly created portfolio
    this.state = {
      id: this.props.portfoliosLength,
      title: "",
      unitsAvailable: 0,
      averageCost: 0,
    };
  }
  // The app should display new portfolio by calling addPortfolio function that passed down from the parent.
  handleSubmitPortfolio = (e) => {
    e.preventDefault();
    const portfolio = this.state;
    this.props.addPortfolio(portfolio);

    this.setState({
      id: this.props.portfoliosLength,
      title: "",
      unitsAvailable: 0,
      averageCost: 0,
    });
  };
  // when there is input, the stockName will be updated according to the value in the input
  handleChangePortfolio = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitPortfolio}>
          <h4>Add a portfolio</h4>
          <h5>Stock Name:</h5>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChangePortfolio}
          />
          <input type="submit" name="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default CreatePortfolio;
