import React, { Component } from "react";
import Confirmation from "./confirmation";
import _ from "lodash";

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
    console.log(this.state);
    this.toggleConfirmation();
  };

  updateTimerValue = field => {
    return () => {
      let selector = document
        .getElementById("selector")
        .getBoundingClientRect();
      let fieldElements = document.querySelectorAll(`.timer-value.${field}`);
      // for each timer element that isn't one of the empty spaces for placeholder/styling purposes, get the average of its top and bottom positions and check that against the selector bar's top and bottom bounding positions to determine if it should be selected and also update the state's value for that timer spec for handling submit
      fieldElements.forEach(elem => {
        if (elem.innerHTML !== " ") {
          let scrollPos =
            (elem.getBoundingClientRect().top +
              elem.getBoundingClientRect().bottom) /
            2;
          if (scrollPos >= selector.top && scrollPos <= selector.bottom) {
            elem.className = `timer-value ${field} selected`;
            this.setState({ [field]: parseInt(elem.innerHTML) });
          } else {
            if (elem.className !== `timer-value ${field}`) {
              elem.className = `timer-value ${field}`;
            }
          }
        }
      });
    };
  };

  renderTask = () => {
    const scrollables = Object.keys(this.state).map((timerSpec, idx) => {
      if (timerSpec !== "showConfirmation") {
        return (
          <Scrollable
            key={idx}
            spec={timerSpec}
            updateTimerValue={this.updateTimerValue}
          />
        );
      }
    });

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
            <span className="timer-selector-bar" id="selector" />
            {scrollables}
          </div>
          <button
            className="form-submit-button"
            onClick={this.handleStartTimer}
          >
            Start
          </button>
        </div>
      );
    }
  };

  render = () => {
    return (
      <div>
        <div className="overlay" onClick={this.props.hideTask} />
        {this.renderTask()}
      </div>
    );
  };
}

const Scrollable = props => {
  const header = _.capitalize(props.spec);
  const arrayLength = props.spec === "hour" ? 13 : 60;

  return (
    <div className="timer-input-container">
      <h4>{header}</h4>
      <div
        className="timer-scrollable-container"
        onScroll={props.updateTimerValue(props.spec)}
      >
        {[" ", " ", " ", " ", " ", " ", " ", " "]
          .concat([...Array(arrayLength).keys()])
          .concat([" ", " ", " ", " ", " ", " ", " ", " ", " "])
          .map((val, idx) => {
            const className =
              val === 0
                ? `timer-value ${props.spec} selected`
                : `timer-value ${props.spec}`;
            return (
              <p key={idx} className={className}>
                {val}
              </p>
            );
          })}
      </div>
    </div>
  );
};
