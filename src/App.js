import React, { Component } from "react";
import Navbar from "./components/navbar";
import Overview from "./components/overview";
import Floormap from "./components/floormap";
import Footer from "./components/footer";
import "./App.css";

export default class App extends Component {
  state = {
    viewSelected: "overview",
    machineSelected: false,
    displaySplash: true
  };

  componentDidMount = () => {
    setTimeout(this.unmountSplash, 3000);
  };

  unmountSplash = () => {
    this.setState({ displaySplash: false });
  };

  selectView = view => {
    this.setState({ viewSelected: view });
  };

  toggleMachineSelection = () => {
    this.setState({ machineSelected: !this.state.machineSelected });
  };

  render = () => {
    if (this.state.displaySplash) {
      return (
        <div className="splash">
          <img src="./assets/splash.png" alt="Splash Logo" />
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          {this.state.viewSelected === "overview" ? (
            <Overview toggleMachineSelection={this.toggleMachineSelection} />
          ) : (
            <Floormap />
          )}
          {!this.state.machineSelected ? (
            <Footer
              viewSelected={this.state.viewSelected}
              selectView={this.selectView}
            />
          ) : (
            ""
          )}
        </div>
      );
    }
  };
}
