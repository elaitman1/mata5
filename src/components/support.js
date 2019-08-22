import React, { Component } from "react";

export default class Support extends Component {
  state = {
    supportMessage: ""
  };

  update = e => {
    this.setState({ supportMessage: e.currentTarget.value });
  };

  sendHelpMessage = () => {
    this.setState({ supportMessage: "" });
  };

  render = () => {
    return (
      <div className="support-container">
        <h4>Hi, How Can We Help?</h4>
        <textarea
          className="support-form-textarea"
          value={this.state.supportMessage}
          placeholder="Please briefly summarize the issue you just encountered. You'll be asked for more details later."
          onChange={this.update}
        />
        <button className="form-submit-button" onClick={this.sendHelpMessage}>
          Send
        </button>
      </div>
    );
  };
}
