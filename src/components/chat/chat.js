import React, { Component } from "react";

export default class Chat extends Component {
  state = {
    search: ""
  };

  update = e => {
    this.setState({ search: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ search: "" });
  };

  render = () => {
    return (
      <div className="chat-container">
        <div className="chat-header">
          <form className="chat-search" onSubmit={this.handleSubmit}>
            <img className="logo" src="./assets/search.png" alt="Search" />
            <input
              type="text"
              value={this.state.search}
              placeholder="Search"
              onChange={this.update}
            />
          </form>
        </div>
        {Object.keys(this.props.chats).map((type, idx) => {
          const chats = this.props.chats[type];
          return (
            <ChatGroup
              key={idx}
              type={type}
              chats={chats}
              selectChat={this.props.selectChat}
            />
          );
        })}
      </div>
    );
  };
}

const ChatGroup = props => {
  return (
    <div className="chat-group-container">
      <h5>{props.type}</h5>
      {Object.keys(props.chats).map((chat, idx) => {
        const className = `chat-group-item-icon ${props.type}`;
        return (
          <div
            key={idx}
            className="chat-group-item"
            onClick={props.selectChat(props.type, chat)}
          >
            <span className={className} />
            <p>{chat}</p>
          </div>
        );
      })}
    </div>
  );
};
