import React, { Component } from "react";

export default class ChatItem extends Component {
  state = {
    message: ""
  };

  timeConversion = millisec => {
    const seconds = (millisec / 1000).toFixed(0);
    const minutes = (millisec / (1000 * 60)).toFixed(0);
    const hours = (millisec / (1000 * 60 * 60)).toFixed(0);
    const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);
    if (seconds < 60) {
      return seconds + " sec";
    } else if (minutes < 60) {
      const mins = parseInt(minutes) === 1 ? " min" : " mins";
      return minutes + mins;
    } else if (hours < 24) {
      const hrs = parseInt(hours) === 1 ? " hr" : " hrs";
      return hours + hrs;
    } else {
      const ds = parseInt(days) === 1 ? " day" : " days";
      return days + ds;
    }
  };

  update = e => {
    this.setState({ message: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render = () => {
    const chatItem = this.props.chats[this.props.displayChat[0]][
      this.props.displayChat[1]
    ];

    return (
      <div className="chat-item-container">
        <h5>{chatItem.chatFirstBegan}</h5>
        <section className="chat-item-messages-container">
          {chatItem.chatHistory.map((chat, idx) => {
            const machImg =
              chat[0] === "machine" ? (
                <img src="./assets/machine.png" alt="MachIcon" />
              ) : (
                ""
              );

            const bubbleArrow =
              chat[0] === "machine" ? <span>&#9664;</span> : "";

            let timeAgo = Date.now() - chat[2];
            timeAgo = this.timeConversion(timeAgo);
            const userMsgTime =
              chat[0] === "user" ? (
                <div className="chat-item-time">
                  <span>&#10003;</span>
                  <p>{timeAgo} ago</p>
                </div>
              ) : (
                ""
              );

            const className =
              chat[0] === "machine"
                ? "chat-item-bubble machine"
                : "chat-item-bubble user";

            return (
              <div key={idx} className="chat-item-message-container">
                <div className="chat-item-message">
                  {machImg}
                  <div className={className}>
                    {bubbleArrow}
                    <p>{chat[1]}</p>
                  </div>
                </div>
                {userMsgTime}
              </div>
            );
          })}
        </section>
        <form className="chat-item-message-submit" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Your Message"
            value={this.state.message}
            onChange={this.update}
          />
          <input className="chat-item-message-submit-button" type="submit" value="SEND" />
        </form>
      </div>
    );
  };
}
