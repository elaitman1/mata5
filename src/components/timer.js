import React, { Component } from "react";
import Confirmation from "./confirmation";

export default class Timer extends Component {
  state = {
    hour: null,
    minute: null,
    second: null,
    showConfirmation: false
  };

  toggleConfirmation = () => {
    this.setState({ showConfirmation: !this.state.showConfirmation });
  };

  handleStartTimer = () => {
    this.toggleConfirmation();
  };

  updateTimerValue = (field) => {
    return () => {
      let selector = document.getElementById("selector").getBoundingClientRect();
      let fieldElements = document.querySelectorAll(`.timer-value.${field}`);
      fieldElements.forEach(elem => {
        let scrollPos = (elem.getBoundingClientRect().top + elem.getBoundingClientRect().bottom)/2;
        let input = elem.innerHTML;
        let timerValue = "";
        if (scrollPos >= selector.top && scrollPos <= selector.bottom) {
          elem.className = `timer-value ${field} selected`;
          if (field !== "hour") {
            if (input.length < 3) {
              const text = field === "second" ? "sec" : (input > 1 ? "mins" : "min");
              elem.innerHTML = `${input} ${text}`;
              timerValue = input;
            }
          } else {
            for (let i=0; i<input.length; i++) {
              let str = input[i];
              if (parseInt(str) < 60) {
                timerValue = timerValue.concat(str);
              }
            }
          }

          this.setState({ [field]: parseInt(timerValue) })
        } else {
          if (elem.className !== `timer-value ${field}`) {
            elem.className = `timer-value ${field}`;
          }
          if (field !== "hour") {
            for (let i=0; i<input.length; i++) {
              let str = input[i];
              if (parseInt(str) < 60) {
                timerValue = timerValue.concat(str);
              }
            }
            elem.innerHTML = timerValue;
          }
        }
      })
    }
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
            <div className="timer-scrollable-container" onScroll={this.updateTimerValue("hour")}>
              {[" ", " ", " ", " ", " ", " ", " ", " "]
                .concat([...Array(13).keys()])
                .concat([" ", " ", " ", " ", " ", " ", " ", " ", " "])
                .map((hr, idx) => {
                  const hrs = hr === " " ? " " : hr > 1 ? "hrs" : "hr";
                  const className = hr === 0 ? "timer-value hour selected" : "timer-value hour";
                  return (
                    <p key={idx} id={idx} className={className}>
                      {hr} {hrs}
                    </p>
                  );
                })}
            </div>
            <div className="timer-scrollable-container" onScroll={this.updateTimerValue("minute")}>
              {[" ", " ", " ", " ", " ", " ", " ", " "]
                .concat([...Array(60).keys()])
                .concat([" ", " ", " ", " ", " ", " ", " ", " ", " "])
                .map((min, idx) => {
                  const mins = min === 0 ? "min" : ""
                  const className = min === 0 ? "timer-value minute selected" : "timer-value minute";
                  return (
                    <p key={idx} id={idx} className={className}>
                      {min} {mins}
                    </p>
                  );
                })}
            </div>
            <div className="timer-scrollable-container" onScroll={this.updateTimerValue("second")}>
              {[" ", " ", " ", " ", " ", " ", " ", " "]
                .concat([...Array(60).keys()])
                .concat([" ", " ", " ", " ", " ", " ", " ", " ", " "])
                .map((sec, idx) => {
                  const secs = sec === 0 ? "sec" : ""
                  const className = sec === 0 ? "timer-value second selected" : "timer-value second";
                  return (
                    <p key={idx} id={idx} className={className}>
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
