import React, { Component } from "react";


export default class Support extends Component {
  state = {
    supportMessage: ""
  };

  update = e => {
    this.setState({ supportMessage: e.currentTarget.value });
  };

  sendHelpMessage = () => {

    fetch('https://api.sendgrid.com/v3/mail/send',{
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "personalizations":
            [{
              "to":[{
                'email':'contact@matainventive.com',
                'name': 'Mata Inventive'
              }],
              'subject':'Help/Support',
            }],
          'content':[{
            'type':'text/plain',
            'value':this.state.supportMessage
          }],
          'from':{
            'email':this.props.user.user_email,
            'name':this.props.user.first_name
          }
      })
    })
    .then(this.props.hideProfile)
  }


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
