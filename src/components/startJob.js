import React, { Component } from "react";
import StartJobItem from "./startJobItem";

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
    currentJob: 1
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

  removeSavedJob = jobNum => {
    let newJobs = this.state.jobs.slice();
    newJobs = newJobs.filter(job => job.jobNum !== jobNum);
    this.setState({
      jobs: newJobs,
      totalJobs: this.state.totalJobs - 1,
      currentJob: 1
    });
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

  render = () => {
    let leftArrow =
      this.state.totalJobs > 1 ? (
        <span className="start-job-arrow left" onClick={this.swipeJob("left")}>
          &lsaquo;
        </span>
      ) : (
        ""
      );
    let rightArrow =
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

    return (
      <div>
        <div className="overlay" />
        <div className="start-job-container">
          {leftArrow}
          <img
            className="start-job-add"
            src="./assets/add.png"
            alt="Add"
            onClick={this.addJob}
          />
          {this.state.jobs.length > 0 ? (
            <StartJobItem
              key={this.state.jobs[this.state.currentJob - 1].jobNum}
              jobNum={this.state.jobs[this.state.currentJob - 1].jobNum}
              inputValues={
                this.state.jobs[this.state.currentJob - 1].inputValues
              }
              currentJob={this.state.currentJob}
              totalJobs={this.state.totalJobs}
              update={this.update}
              removeJob={this.removeSavedJob}
              hideTask={this.props.hideTask}
            />
          ) : (
            ""
          )}
          {rightArrow}
        </div>
      </div>
    );
  };
}
