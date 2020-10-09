import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Users from "./components/Users/Users";
import Search from "./components/Search";
import Alert from "./components/Alert";
import About from "./components/About";
import Spinner from "./components/Spinner";
import UserDeatil from "./components/Users/UserDeatil";

class App extends React.Component {
  state = {
    loading: false,
    user: null,
    users: [],
    alert: null,
    repos: [],
  };

  // Seach user with input passed
  searchUser = async (username) => {
    // Set loading to show spinner
    this.setState({ loading: true });

    const res = await fetch(
      `https://api.github.com/search/users?q=${username}&client_id=7ad0fe3b4aef82c2ed40&client_secret=ae546f52200474a36f2e42a18ac62040f1e58723`
    );

    const users = await res.json();
    // Fetched relevant results
    this.setState({ users: users.items, loading: false });
  };

  // Get a single user
  getUser = async (username) => {
    // Set loading to show spinner
    this.setState({ loading: true });

    const res = await fetch(
      `https://api.github.com/users/${username}?client_id=7ad0fe3b4aef82c2ed40&client_secret=ae546f52200474a36f2e42a18ac62040f1e58723`
    );

    // Get repos of user as well
    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created: asc&client_id=7ad0fe3b4aef82c2ed40&client_secret=ae546f52200474a36f2e42a18ac62040f1e58723`
    );

    const user = await res.json();
    const userRepos = await repoRes.json();

    // Fetched relevant results
    this.setState({ user: user, loading: false, repos: userRepos });
  };

  // Clear all current users
  onClear = () => {
    this.setState({ users: [], loading: false });
  };

  // Alerts for various events
  setAlert = (msg, type) => {
    this.setState({
      alert: { msg, type },
    });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            {this.state.alert && <Alert alert={this.state.alert} />}
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => (
                  <React.Fragment>
                    <Search
                      searchUser={this.searchUser}
                      onClear={this.onClear}
                      setAlert={this.setAlert}
                      showClear={this.state.users.length > 0}
                    />
                    {this.state.loading && <Spinner />}
                    {this.state.users && <Users users={this.state.users} />}
                  </React.Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <UserDeatil
                    {...props}
                    getUser={this.getUser}
                    user={this.state.user}
                    loading={this.state.loading}
                    repos={this.state.repos}
                  />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
