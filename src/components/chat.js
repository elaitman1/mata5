import React, { Component } from "react";

export default class Chat extends Component {
  state = {
    chats: {
      Machines: ["Machine 1", "Eurotech 1", "Eurotech 2", "Franz Cell 2"],
      Parts: ["57HXET89EEA", "99AYYOT6653", "12389HAAU89"],
      Jobs: ["57HXET89EEA", "99AYYOT6653", "12389HAAU89"]
    },
    search: ""
  };

  update = e => {
    this.setState({ search: e.currentTarget.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ search: "" });
  }

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
        {Object.keys(this.state.chats).map((type, idx) => {
          const chats = this.state.chats[type];
          return <ChatGroup key={idx} type={type} chats={chats} />;
        })}
      </div>
    );
  };
}

const ChatGroup = props => {
  return (
    <div className="chat-group-container">
      <h5>{props.type}</h5>
      {props.chats.map((chat, idx) => {
        const className = `chat-group-item-icon ${props.type}`;
        return (
          <div key={idx} className="chat-group-item">
            <span className={className} />
            <p>{chat}</p>
          </div>
        );
      })}
    </div>
  );
};
