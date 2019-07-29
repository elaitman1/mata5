import React, { Component } from "react";
import Confirmation from "./confirmation";
import _ from "lodash";

export default class StartJob extends Component {
  state = {
    jobNumber: "",
    partNumber: "",
    partCount: undefined,
    showConfirmation: false
  }

  update = (type) => {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value })
    }
  }

  toggleConfirmation = () => {
    this.setState({ showConfirmation: !this.state.showConfirmation });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.toggleConfirmation();
  }

  renderTask = () => {
    let inputTypes = Object.keys(this.state);
    inputTypes.pop();

    if (this.state.showConfirmation) {
      return (
        <Confirmation
          task="Start Job"
          hideTask={this.props.hideTask}
          toggleConfirmation={this.toggleConfirmation}
        />
      )
    } else {
      return (
        <form className="start-job-container" onSubmit={this.handleSubmit}>
          <h4>Start Job</h4>
          <div className="start-job-inputs-container">
            <img src="./assets/add.png" alt="Add"/>
            {
              inputTypes.map((inputType, idx) => {
                let type = _.capitalize(inputType.slice(0, inputType.length - 6));
                return (
                  <Input
                    key={idx}
                    type={type}
                    inputType={inputType}
                    inputValue={this.state[inputType]}
                    update={this.update}
                  />
                )
              })
            }
            <input className="form-submit-button" type="submit" value="Save" />
          </div>
        </form>
      )
    }
  }

  render = () => {
    return (
      <div>
        <div className="overlay"></div>
        {this.renderTask()}
      </div>
    )
  }
}

const Input = (props) => {
  const cameraIcon = props.inputType !== "partCount" ?
    <img src="./assets/camera.png" alt="camera" /> : "";

  const inputName = props.inputType !== "partCount" ?
    <p>{props.type} Number</p> :
    <p>Part Count</p>;

  const type = props.inputType !== "partCount" ? "text" : "number";

  return (
    <div className="start-job-input-container">
      {inputName}
      <span className="start-job-input">
        <input
          type={type}
          value={props.inputValue}
          onChange={props.update(props.inputType)}
        />
        {cameraIcon}
      </span>
    </div>
  )
}
