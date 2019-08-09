import React, { Component } from "react";
import _ from "lodash";

export default class Splash extends Component {
  state = {
    Username: "",
    Password: "",
    loginErrors: "",
    showLogin: false
  };

  componentDidMount = () => {
    setTimeout(() => this.setState({ showLogin: true }), 3000);
  };

  componentWillUnmount = () => {
    this.setState({ loginErrors: "" });
  };

  update = field => {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.Username.trim() === "") {
      this.setState({ loginErrors: "Username can't be blank." });
    } else if (this.state.Password === "") {
      this.setState({ loginErrors: "Password can't be blank." });
    } else {
      this.props.logIn();
    }
  };

  render = () => {
    const inputs = ["Username", "Password"];
    const inputFields = inputs.map((input, idx) => (
      <Input
        key={idx}
        inputType={input}
        inputValue={this.state[input]}
        update={this.update}
      />
    ));

    return (
      <div className="splash">
        <img src="./assets/splash.png" alt="Splash Logo" />
        {this.state.showLogin ? (
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="login-form-inputs-container">{inputFields}</div>
            <a
              href="https://www.matainventive.com/password-recovery"
              target="_blank"
              rel="noopener noreferrer"
            >
              Forgot Password?
            </a>
            <p>{this.state.loginErrors}</p>
            <input className="login-form-button" type="submit" value="Log In" />
          </form>
        ) : (
          ""
        )}
      </div>
    );
  };
}

const Input = props => {
  const type = props.inputType === "Password" ? "password" : "text";
  const imgSrc = `./assets/${_.lowerFirst(props.inputType)}.png`;

  return (
    <div className="login-form-input-container">
      <img src={imgSrc} alt="Input" />
      <input
        type={type}
        placeholder={props.inputType}
        value={props.inputValue}
        onChange={props.update(props.inputType)}
      />
    </div>
  );
};
