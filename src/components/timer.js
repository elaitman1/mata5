import React, { Component } from "react";
import Confirmation from "./confirmation";

export default class Timer extends Component {
  state = {
    hours: null,
    minutes: null,
    seconds: null,
    showConfirmation: false
  };

  toggleConfirmation = () => {
    this.setState({ showConfirmation: !this.state.showConfirmation });
  };

  handleStartTimer = () => {
    this.toggleConfirmation();
  };

  updateValue = () => {
    let selector = document.getElementById("selector").getBoundingClientRect();
    let hourValues = document.querySelectorAll(".timer-hour-value");
    hourValues.forEach(val => {
      if ((val.getBoundingClientRect().top + val.getBoundingClientRect().bottom)/2 >= selector.top && (val.getBoundingClientRect().top + val.getBoundingClientRect().bottom)/2 <= selector.bottom) {
        val.className = "timer-hour-value selected";
      } else {
        if (val.className !== "timer-hour-value") {
          val.className = "timer-hour-value";
        }
      }
    })
  }

  renderTask = () => {
    if (this.state.showConfirmation) {
      return (
        <Confirmation
          task="Timer"
          hideTask={this.props.hideTask}
          toggleConfirmation={this.toggleConfirmation}
        />
      );
    } else {
      return (
        <div className="timer-container">
          <div className="timer-specs-container">
            <span className="timer-selector-bar" id="selector"></span>
            <div className="timer-scrollable-container" id="test" onScroll={this.updateValue}>
              {[" ", " ", " ", " ", " ", " ", " ", " "]
                .concat([...Array(13).keys()])
                .concat([" ", " ", " ", " ", " ", " ", " ", " ", " "])
                .map((hr, idx) => {
                  const hrs = hr === " " ? " " : hr > 1 ? "hrs" : "hr";
                  const className = hr === 0 ? "timer-hour-value selected" : "timer-hour-value";
                  return (
                    <p key={idx} id={idx} className={className}>
                      {hr} {hrs}
                    </p>
                  );
                })}
            </div>
            <div className="timer-scrollable-container">
              {[" ", " ", " ", " ", " ", " ", " ", " "]
                .concat([...Array(60).keys()])
                .concat([" ", " ", " ", " ", " ", " ", " ", " ", " "])
                .map((min, idx) => {
                  const mins = min === " " ? " " : min > 1 ? "mins" : "min";
                  return (
                    <p key={idx} id={idx} className="timer-value">
                      {min} {mins}
                    </p>
                  );
                })}
            </div>
            <div className="timer-scrollable-container">
              {[" ", " ", " ", " ", " ", " ", " ", " "]
                .concat([...Array(60).keys()])
                .concat([" ", " ", " ", " ", " ", " ", " ", " ", " "])
                .map((sec, idx) => {
                  const secs = sec === " " ? " " : "sec";
                  return (
                    <p key={idx} id={idx} className="timer-value">
                      {sec} {secs}
                    </p>
                  )
                })}
            </div>
          </div>
          <button
            className="form-submit-button"
            onClick={this.handleStartTimer}
          >
            Save
          </button>
        </div>
      );
    }
  };

  render = () => {
    return (
      <div>
        <div className="overlay" />
        {this.renderTask()}
      </div>
    );
  };
}
