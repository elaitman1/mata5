import React, { Component } from "react";
import Splash from "./components/splash";
import Navbar from "./components/navbar";
import Overview from "./components/overview";
import Chat from "./components/chat";
import "./App.css";

export default class App extends Component {
  state = {
    cells: [],
    machineSelected: false,
    loggedIn: false,
    displayChat: false
  };

  componentDidMount = () => {
    this.fetchData("./data.json").then(data => {
      this.setState({
        cells: data
      });
    });
  };

  fetchData = async url => {
    const res = await fetch(url);
    return res.json();
  };

  logIn = () => {
    this.setState({ loggedIn: true });
  };

  selectView = view => {
    this.setState({ viewSelected: view });
  };

  toggleMachineSelection = () => {
    this.setState({ machineSelected: !this.state.machineSelected });
  };

  toggleChat = () => {
    if (this.state.displayChat) {
      document.getElementById("chat").style.transform = "translateX(-70vw)";
      document.getElementById("nav").style.transform = "none";
      document.getElementById("main").style.transform = "none";
    } else {
      document.getElementById("chat").style.transform = "none";
      document.getElementById("nav").style.transform = "translateX(85vw)";
      document.getElementById("main").style.transform = "translateX(85vw)";
    }

    this.setState({ displayChat: !this.state.displayChat });
  };

  render = () => {
    if (!this.state.loggedIn) {
      return <Splash logIn={this.logIn} />;
    } else {
      return (
        <div className="app-container">
          <div className="overlay" onClick={this.toggleChat} style={{ display: this.state.displayChat ? "block" : "none" }} />
          <span id="chat" className="chat-wrapper">
            <Chat toggleChat={this.toggleChat} />
          </span>
          <div>
            <Navbar toggleChat={this.toggleChat} />
            <Overview
              cells={this.state.cells}
              toggleMachineSelection={this.toggleMachineSelection}
            />
          </div>
        </div>
      );
    }
  };
}
