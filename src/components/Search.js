import React from "react";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
    };
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Search for the user input entered
  onSubmit = (e) => {
    e.preventDefault();
    // Check for input value
    if (this.state.text === "") {
      this.props.setAlert("Please enter something!", "light");
    } else {
      // Pass the username you want to search
      this.props.searchUser(this.state.text);
      this.setState({ text: "" });
    }
  };

  // Clear the input and fetched results
  onClear = (e) => {
    e.preventDefault();
    this.props.onClear();
    this.setState({ text: "" });
  };

  render() {
    return (
      <form className="form">
        <input
          type="text"
          value={this.state.text}
          name="text"
          onChange={this.onChange}
        />
        <button
          className="btn btn-primary btn-block"
          type="submit"
          onClick={this.onSubmit}
        >
          Search
        </button>
        {this.props.showClear && (
          <button
            className="btn btn-light btn-block my-1"
            onClick={this.onClear}
          >
            Clear
          </button>
        )}
      </form>
    );
  }
}

export default Search;
