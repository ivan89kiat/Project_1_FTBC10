import { lineHeight } from "@mui/system";
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
      id: this.props.portfoliosLength,
      title: e.target.value.toUpperCase(),
    });
  };

  render() {
    return (
      <div>
        <h4>Add Portfolio</h4>
        <form onSubmit={this.handleSubmitPortfolio}>
          <div className="createPortfolio">
            <p>Stock Name:</p>
            <input
              key={this.props.portfoliosLength}
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChangePortfolio}
            />
            <input className="button" type="submit" name="ADD" value="ADD" />
          </div>
        </form>
        <br />
      </div>
    );
  }
}

export default CreatePortfolio;
