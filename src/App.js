import React, { Component } from "react";
import Splash from "./components/splash";
import Navbar from "./components/navbar";
import Chat from "./components/chat";
import Main from "./components/main";
import "./App.css";

export default class App extends Component {
  state = {
    cells: [],
    machineSelected: null,
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

  // toggles between Overview and Floorplan views within Feed component based on toggled value from Footer component (currently removed)
  selectView = view => {
    this.setState({ viewSelected: view });
  };

  // this function is passed down as props all the way to Feed Item component to select a machine and view/interact with the machine's various tasks
  toggleMachineSelection = machInfo => {
    return () => {
      this.setState({ machineSelected: machInfo });
    };
  };

  // transition effects for chat submenu when clicking the navbar's left logo icon;
  // chat menu is positioned off of the viewport by an amount equal to its width until the logo icon is toggled, where it slides in as the app's Main component also slides off the viewport to the right by the same width.
  toggleChat = () => {
    const displayChat = this.state.displayChat;
    const chatTransform = displayChat ? "translateX(-85vw)" : "none";
    const navTransform = displayChat ? "none" : "translateX(85vw)";
    const mainTransform = displayChat ? "none" : "translateX(85vw)";
    const mainPos = displayChat ? "static" : "fixed";
    document.getElementById("chat").style.transform = chatTransform;
    document.getElementById("nav").style.transform = navTransform;
    document.getElementById("main").style.transform = mainTransform;
    document.getElementById("main").style.position = mainPos;

    this.setState({ displayChat: !this.state.displayChat });
  };

  render = () => {
    if (!this.state.loggedIn) {
      return <Splash logIn={this.logIn} />;
    } else {
      return (
        <div className="app-container">
          <div
            className="overlay"
            onClick={this.toggleChat}
            style={{ display: this.state.displayChat ? "block" : "none" }}
          />
          <span id="chat" className="chat-wrapper">
            <Chat toggleChat={this.toggleChat} />
          </span>
          <div>
            <Navbar toggleChat={this.toggleChat} />
            <Main
              cells={this.state.cells}
              machineSelected={this.state.machineSelected}
              toggleMachineSelection={this.toggleMachineSelection}
            />
          </div>
        </div>
      );
    }
  };
}
