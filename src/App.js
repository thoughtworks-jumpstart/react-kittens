import React from "react";
import "./App.css";
import axios from "axios";

const fetch = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.baseUrl = "http://localhost:5000";

    this.state = {
      isLoggedIn: false,
      kittens: [],
      owners: []
    };
  }

  fetchKittens = () => {
    fetch
      .get("/kittens")
      .then(res => {
        this.setState({kittens: res.data});
      })
      .catch(err => {
        console.error(err);
      });
  };

  fetchOwners = () => {
    fetch
      .get("/owners/bill")
      .then(res => {
        console.log(res.data);
        this.setState({owners: res.data});
      })
      .catch(err => {
        console.error(err);
      });
  };

  loginHandler = () => {
    fetch
      .post("/owners/login", {
        username: "bill",
        password: "test12345"
      })
      .then(res => {
        console.log(res);
        this.setState({isLoggedIn: true});
      })
      .catch(err => {
        console.error(err, err.message);
      });
  };

  logoutHandler = () => {
    fetch
      .post("/owners/logout")
      .then(res => {
        console.log(res.data);
        this.setState({isLoggedIn: false});
      })
      .catch(err => {
        console.error(err, err.message);
      });
  };

  renderLoginPanel() {
    return (
      <div>
        <input name="username" type="text" defaultValue="bill" readOnly />
        <input
          name="password"
          type="password"
          defaultValue="test12345"
          readOnly
        />
        <button onClick={this.loginHandler}>Login</button>
        <button onClick={this.logoutHandler}>Logout</button>
      </div>
    );
  }

  renderOwnersList() {
    return this.state.owners.map(owner => (
      <p key={owner._id}>{owner.username}</p>
    ));
  }

  render() {
    return (
      <div>
        <h1>Kittens Galore</h1>
        {this.renderLoginPanel()}
        <div>
          <button onClick={this.fetchKittens}>
            Get me all the lovely kittens
          </button>
        </div>
        <div>
          <button onClick={this.fetchOwners}>Get owner details</button>
        </div>
        {this.state.isLoggedIn
          ? this.renderOwnersList()
          : "You need to login to view the list of owners"}
        {this.state.kittens.map(kitten => (
          <p key={kitten._id}>
            {kitten.name} is a {kitten.sex} kitten and is {kitten.age} years
            old.
          </p>
        ))}
      </div>
    );
  }
}

export default App;
