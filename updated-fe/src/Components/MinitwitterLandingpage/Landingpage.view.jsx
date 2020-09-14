import React, { Component } from "react";
import "./Landingpage.css";
import logo from "./../../logo.png";
import { withRouter } from "react-router-dom";

export class Landingpage extends Component {
  render() {
    return (
      <div className="App">
        {/* Whole page is splitted in two parts */}

        <div className="split left">
          <div className="centered">
            <img src={logo} alt="logo InstaTwitter"></img>
          </div>
          <div id="textInLeft">Hear what people are talking about.</div>
        </div>

        <div className="split right">
          <img src={require("./../../logo.gif")} alt="gif of logo" />
          <h1>See what’s happening in the world right now</h1>
          <button
            id="btn-SignIn"
            type="Submit"
            onClick={() => this.props.history.push("/minitwitter/registration/")}
          >
            Sign Up
          </button>
          <button
            id="btn-LogIn"
            type="Submit"
            onClick={() => this.props.history.push("/minitwitter/login/")}
          >
            Log In
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Landingpage);
