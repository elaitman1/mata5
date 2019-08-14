import React, { Component } from "react";
import Timer from "./timer";

export default class Notifications extends Component {
  state = {
    showFromTimer: false,
    showToTimer: false
  };

  toggleTimer = type => {
    return () => {
      const key = `show${type}Timer`;
      this.setState({ [key]: !this.state[key] });
    }
  }

  render = () => {
    return (
      <div className="notifications-container">
        {Object.keys(this.props.user.notifications).map((notif, idx) => {
          const notifications = this.props.user.notifications;
          if (notif !== "Do Not Disturb") {
            return (
              <ToggleInput
                key={idx}
                notification={notif}
                toggled={notifications[notif]}
                toggleNotification={this.props.toggleNotification}
              />
            );
          } else {
            return (
              <div key={idx} className="notifications-do-not-disturb-container">
                <p>{notif}</p>
                <ToggleInput
                  notification="Scheduled"
                  toggled={notifications[notif].on}
                  toggleNotification={this.props.toggleNotification}
                />
                <div style={{display: notifications[notif].on ? "initial" : "none"}}>
                {Object.keys(notifications[notif]).map((dndField, idx) => {
                  if (dndField !== "on") {
                    const showTimer = dndField === "From" ? this.state.showFromTimer : this.state.showToTimer;
                    return (
                      <CollapseInput
                        key={idx}
                        dndField={dndField}
                        showTimer={showTimer}
                        toggleTimer={this.toggleTimer}
                      />
                    );
                  }
                })}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };
}

const ToggleInput = props => {
  const inputName =
    props.notification === "Scheduled"
      ? "Scheduled"
      : `${props.notification} Notifications`;
  const sliderClassName = props.toggled
    ? "toggle-input-slider toggled"
    : "toggle-input-slider";
  const circleClassName = props.toggled
    ? "toggle-input-circle toggled"
    : "toggle-input-circle";
  const toggleArg =
    props.notification === "Scheduled" ? "Do Not Disturb" : props.notification;
  return (
    <div className="toggle-input-container">
      <p>{inputName}</p>
      <div
        className={sliderClassName}
        onClick={props.toggleNotification(toggleArg)}
      >
        <span className={circleClassName} />
      </div>
    </div>
  );
};

const CollapseInput = props => {
  const className = props.showTimer
    ? "collapse-input-arrow"
    : "collapse-input-arrow down";
  return (
    <div className="collapse-input-container">
      <div className="collapse-input-clickable" onClick={props.toggleTimer(props.dndField)}>
        <p>{props.dndField}</p>
        <span className={className} style={{transform: props.showTimer ? "rotate(90deg)" : ""}}>&rsaquo;</span>
      </div>
      <div style={{display: props.showTimer ? "initial" : "none"}}>
        <Timer notificationTimer={true} />
      </div>
    </div>
  );
};
