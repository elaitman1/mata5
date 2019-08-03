import React, { Component } from "react";
import Confirmation from "./confirmation";

export default class Timer extends Component {
  state = {
    hours: null,
    minutes: null,
    seconds: null,
    showConfirmation: false
  }

  toggleConfirmation = () => {
    this.setState({ showConfirmation: !this.state.showConfirmation });
  }

  handleStartTimer = () => {
    this.toggleConfirmation();
  }

  renderTask = () => {
    if (this.state.showConfirmation) {
      return (
        <Confirmation
          task="Timer"
          hideTask={this.props.hideTask}
          toggleConfirmation={this.toggleConfirmation}
        />
      )
    } else {
      return (
        <div className="timer-container">
          <div className="timer-specs-container">
            <div className="timer-scrollable-container">
              {
                [...Array(13).keys()].map((hr, idx) => {
                  const hrs = hr > 1 ? "hrs" : "hr";
                  return <p key={idx}>{hr} {hrs}</p>
                })
              }
            </div>
            <div className="timer-scrollable-container">
              {
                [...Array(60).keys()].map((min, idx) => (
                  <p key={idx}>{min}</p>
                ))
              }
            </div>
            <div className="timer-scrollable-container">
              {
                [...Array(60).keys()].map((sec, idx) => (
                  <p key={idx}>{sec}</p>
                ))
              }
            </div>
          </div>
          <button className="form-submit-button" onClick={this.handleStartTimer}>Save</button>
        </div>
      )
    }
  }

  render = () => {
    return (
      <div>
        <div className="overlay" />
        {this.renderTask()}
      </div>
    )
  }
}
