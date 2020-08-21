import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import EventList from "./components/events.component";
import AddEvent from "./components/add-event.component";
import EditEvent from "./components/edit-event.component";
import Event from "./components/event.component";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      token: "",
    }
  }

  renderButtons(){
    if(this.state.token === "")
    {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/sign-in"}>Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/api-auth"}>Sign up</Link>
          </li>
        </ul>
      );
    }else{
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/events"}>My Events</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/create-event"}>Add Event</Link>
          </li>
        </ul>
      );

    }
  }

  submitToken(userToken){
    this.setState(
      {token: userToken}
    )
  }
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark navbar-fixed-top">
            <div className="container">
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">Cloud Events</a>
                </div>
                {this.renderButtons()}
              </div>
            </div>
          </nav>

          <div className="auth-wrapper">
            <Switch>
              <Route exact path='/' component={() => <Login isLoggedIn={this.state.token !== ""} submitToken={(token) => this.submitToken(token)} />} />
              <Route path="/sign-in" component={() => <Login isLoggedIn={this.state.token !== ""} submitToken={(token) => this.submitToken(token)} />} />
              <Route path="/api-auth" component={() => <SignUp isLoggedIn={this.state.token !== ""} submitToken={(token) => this.submitToken(token)}/>} />
              <Route path="/events" component={() => <EventList userToken = {this.state.token}/>}/>
              <Route path="/create-event" component={() => <AddEvent usertoken = {this.state.token}/>}/>
              <Route path="/edit-event" component={() => <EditEvent userToken = {this.state.token}/>} />
              <Route path="/event" component={Event}/>
            </Switch>
          </div>
        </div></Router>
    );
  }
}