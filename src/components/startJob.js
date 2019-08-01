import React, { Component } from "react";
import StartJobItem from "./startJobItem";

export default class StartJob extends Component {
  state = {
    jobs: [[]],
    currentJob: 1
  };

  componentDidMount = () => {
    const initialJob = [
      [1, <StartJobItem jobNum={1} removeJob={this.removeSavedJob} />]
    ];
    this.setState({ jobs: initialJob });
  };

  savedAllJobs = () => {
    if (this.jobs.length === 0) {
      this.props.hideTask();
    }
  };

  removeSavedJob = jobNum => {
    return () => {
      let newJobs = this.state.jobs.slice();
      console.log(newJobs);
      newJobs.forEach((job, idx) => {
        if (job[0] === jobNum) {
          newJobs.splice(idx, 1);
          return;
        }
      });
      console.log(newJobs);
      this.setState({ jobs: newJobs });
      this.savedAllJobs();
    };
  };

  addJob = () => {
    let newJobs = this.state.jobs.slice();
    let jobNum = newJobs.length + 1;
    const newJob = (
      <StartJobItem jobNum={jobNum} removeJob={this.removeSavedJob} />
    );
    newJobs.push([jobNum, newJob]);
    this.setState({ jobs: newJobs });
  };

  swipeJob = dir => {
    return () => {
      let totalJobs = this.state.jobs.length;
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
    }
  };

  render = () => {
    let leftArrow =
      this.state.jobs.length > 1 ? (
        <span
          className="start-job-arrow left"
          onClick={this.swipeJob("left")}
        >
          &lsaquo;
        </span>
      ) : (
        ""
      );
    let rightArrow =
      this.state.jobs.length > 1 ? (
        <span
          className="star-job-arrow right"
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
          {this.state.jobs[this.state.currentJob - 1][1]}
          {rightArrow}
        </div>
      </div>
    );
  };
}
