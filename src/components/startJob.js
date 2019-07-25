import React, { Component } from "react";
import _ from "lodash";

export default class StartJob extends Component {
  state = {
    jobNumber: "",
    partNumber: "",
    partCount: undefined
  }

  update = (type) => {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.hideTask();
  }

  render = () => {
    const inputTypes = Object.keys(this.state);

    return (
      <div>
        <div className="overlay"></div>
        <form className="inspection-container" onSubmit={this.handleSubmit}>
          <h4>Start Job</h4>
          <div className="start-job-input-container">
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
          </div>
          <input className="inspection-button" type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

const Input = (props) => {
  const cameraIcon = props.inputType !== "partCount" ?
    <img src="" alt="camera" /> : "";

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
