import React, { Component } from "react";
import Confirmation from "../confirmation";
import _ from "lodash";

export default class StartJobItem extends Component {
  state = {
    showConfirmation: false
  };

  toggleConfirmation = () => {
    this.setState({ showConfirmation: !this.state.showConfirmation });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.toggleConfirmation();
  };

  renderTask = () => {
    let inputTypes = Object.keys(this.state);
    inputTypes.pop();

    let startJobObj = {
      totalJobs: this.props.totalJobs,
      removeJob: this.props.removeJob,
      jobNum: this.props.jobNum
    };

    if (this.state.showConfirmation) {
      return (
        <Confirmation
          task="Start Job"
          hideTask={this.props.hideTask}
          startJobObj={startJobObj}
          toggleConfirmation={this.toggleConfirmation}
        />
      );
    } else {
      return (
        <form className="start-job-item-container" onSubmit={this.handleSubmit}>
          <h4>Start Job {this.props.jobNum}</h4>
          <div className="start-job-item-inputs-container">
            {Object.keys(this.props.inputValues).map((inputType, idx) => {
              let type = _.capitalize(inputType.slice(0, inputType.length - 6));
              return (
                <Input
                  key={idx}
                  type={type}
                  inputType={inputType}
                  inputValue={this.props.inputValues[inputType]}
                  jobNum={this.props.jobNum}
                  update={this.props.update}
                />
              );
            })}
            <input className="form-submit-button" type="submit" value="Save" />
          </div>
        </form>
      );
    }
  };

  render = () => {
    return <div>{this.renderTask()}</div>;
  };
}

const Input = props => {
  const cameraIcon =
    props.inputType !== "partCount" ? (
      <img src="./assets/camera.png" alt="camera" />
    ) : (
      ""
    );

  const inputName =
    props.inputType !== "partCount" ? (
      <p>{props.type} Number</p>
    ) : (
      <p>Part Count</p>
    );

  const type = props.inputType !== "partCount" ? "text" : "number";

  const update = (e) => {
    props.update(props.inputType, props.jobNum, e.currentTarget.value);
  };

  return (
    <div className="start-job-item-input-container">
      {inputName}
      <span className="start-job-item-input">
        <input type={type} value={props.inputValue} onChange={update} />
        {cameraIcon}
      </span>
    </div>
  );
};
