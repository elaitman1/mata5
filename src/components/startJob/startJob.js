import React, { Component } from "react";
import Confirmation from "../confirmation";
import StartJobItem from "./startJobItem";
import Camera from "../camera";

export default class StartJob extends Component {
  state = {
    jobs: [
      {
        jobNum: 1,
        inputValues: {
          jobNumber: "",
          partNumber: "",
          partCount: undefined
        }
      }
    ],
    totalJobs: 1,
    currentJob: 1,
    showErrorModal: false,
    showCamera: false,
    showConfirmation: false
  };

  toggleConfirmation = () => {
    this.setState({ showConfirmation: !this.state.showConfirmation });
  };

  update = (type, jobNum, value) => {
    let newJobs = this.state.jobs;
    newJobs.forEach(job => {
      if (job.jobNum === jobNum) {
        job.inputValues[type] = value;
      }
    });
    this.setState({ jobs: newJobs });
  };

  addJob = () => {
    let newJobs = this.state.jobs.slice();
    let jobNum = newJobs.length + 1;
    const newJob = {
      jobNum: jobNum,
      inputValues: {
        jobNumber: "",
        partNumber: "",
        partCount: undefined
      }
    };

    newJobs.push(newJob);
    this.setState({
      jobs: newJobs,
      totalJobs: this.state.totalJobs + 1
    });
  };

  swipeJob = dir => {
    return () => {
      let totalJobs = this.state.totalJobs;
      let currJob = this.state.currentJob;
      if (dir === "left") {
        if (currJob === 1) {
          currJob = totalJobs;
        } else {
          currJob -= 1;
        }
      } else if (dir === "right") {
        if (currJob === totalJobs) {
          currJob = 1;
        } else {
          currJob += 1;
        }
      }
      this.setState({ currentJob: currJob });
    };
  };

  handleSubmit = () => {
    if (this.hasNoEmptyCards()) {
      this.toggleConfirmation();
    } else {
      this.toggleEmptyCardModal();
    }
  };

  toggleCamera = () => {
    this.setState({ showCamera: !this.state.showCamera });
  }

  toggleEmptyCardModal = () => {
    this.setState({ showErrorModal: !this.state.showErrorModal });
  };

  hasNoEmptyCards = () => {
    return this.state.jobs.every(job => {
      return Object.keys(job.inputValues).every(inputVal => {
        return job.inputValues[inputVal] ? true : false;
      });
    });
  };

  render = () => {
    const leftArrow =
      this.state.totalJobs > 1 ? (
        <span className="start-job-arrow left" onClick={this.swipeJob("left")}>
          &lsaquo;
        </span>
      ) : (
        ""
      );
    const rightArrow =
      this.state.totalJobs > 1 ? (
        <span
          className="start-job-arrow right"
          onClick={this.swipeJob("right")}
        >
          &rsaquo;
        </span>
      ) : (
        ""
      );

    const errorModal = this.state.showErrorModal ? (
      <span className="start-job-modal-overlay">
        <div className="start-job-modal-container">
          <p>Please complete all job cards' input fields.</p>
          <button
            className="form-submit-button"
            onClick={this.toggleEmptyCardModal}
          >
            Ok
          </button>
        </div>
      </span>
    ) : (
      ""
    );

    const startJobItems =
      this.state.jobs.length > 0 ? (
        <StartJobItem
          key={this.state.jobs[this.state.currentJob - 1].jobNum}
          jobNum={this.state.jobs[this.state.currentJob - 1].jobNum}
          inputValues={this.state.jobs[this.state.currentJob - 1].inputValues}
          currentJob={this.state.currentJob}
          totalJobs={this.state.totalJobs}
          update={this.update}
          toggleCamera={this.toggleCamera}
        />
      ) : (
        ""
      );

    const tracker =
      this.state.totalJobs > 1
        ? [...Array(this.state.totalJobs).keys()].map((dot, idx) => {
            let className =
              idx === this.state.currentJob - 1
                ? "start-job-tracker-dot selected"
                : "start-job-tracker-dot";
            return (
              <span key={idx} className={className}>
                &#9679;
              </span>
            );
          })
        : "";

    if (this.state.showConfirmation) {
      return (
        <Confirmation
          task="Start Job"
          hideTask={this.props.hideTask}
          toggleConfirmation={this.toggleConfirmation}
        />
      );
    } else if (this.state.showCamera) {
      return <Camera toggleCamera={this.toggleCamera} />
    } else {
      return (
        <div>
          <div className="overlay" onClick={this.props.hideTask} />
          <div className="start-job-container">
            {errorModal}
            {leftArrow}
            <img
              className="start-job-add"
              src="./assets/add.png"
              alt="Add"
              onClick={this.addJob}
            />
            <h4>
              Start Job {this.state.currentJob} of {this.state.totalJobs}
            </h4>
            {startJobItems}
            <div className="button-flex-end-wrapper">
              <button
                className="form-submit-button"
                onClick={this.handleSubmit}
              >
                Save
              </button>
            </div>
            <div className="start-job-tracker-container">{tracker}</div>
            {rightArrow}
          </div>
        </div>
      );
    }
  };
}
