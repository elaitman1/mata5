import React, { Component } from "react";


export default class Support extends Component {
  state = {
    supportMessage: ""
  };

  update = e => {
    this.setState({ supportMessage: e.currentTarget.value });
  };

  sendHelpMessage = () => {
//     {ID: "17", user_email: "themomentdaily@gmail.com", first_name: "", last_name: "", notifications: {…}}
// ID: "17"
// first_name: ""
// last_name: ""
// notifications: {Text: true, Email: true}
// user_email: "themomentdaily@gmail.com"
// __proto__: Object
    // console.log(this.props.user)
  //   let supportMessage = this.state.supportMessage.toString()

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
  }

// '{"personalizations":
//     [{"to":[{
//         "email":"john.doe@example.com",
//         "name":"John Doe"
//       }],
//       "subject":"Hello, World!"
//     }],
//       "content": [{
//         "type": "text/plain",
//         "value": "Heya!"
//       }],
//       "from":{
//         "email":"sam.smith@example.com",
//           "name":"Sam Smith"
//       },
//       "reply_to":{
//         "email":"sam.smith@example.com",
//           "name":"Sam Smith"
//       }
//   }'


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
