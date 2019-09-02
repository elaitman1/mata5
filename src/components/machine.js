import React, { Component } from "react";
import StartJob from "./startJob/startJob";
import PreparationChecklist from "./preparationChecklist";
import Inspection from "./inspection";
import Timer from "./timer";
import JobList from "./jobList"
import TakePhoto from './camera'


class Machine extends Component {
  state = {
    selectedTask: null,
    cameraView: false,
    jobNumber: "",
    inputIndicator: "",
    partNumber: "",
  };

  displayTask = task => {
    return () => {
      this.setState({ selectedTask: task });
    };
  };

  displayAllJobNumbers = () => {
    this.setState({selectedTask:"Job List"})
  }

  toggleCamera = async(inputIndicator) => {
    await this.setState({ cameraView: !this.state.cameraView, inputIndicator:inputIndicator })
  }

  cameraOffAndSetInput = async(input) => {
    if (this.state.inputIndicator === 'Job'){
      await this.setState({ cameraView: !this.state.cameraView, jobNumber: input})
    }else if (this.state.inputIndicator === 'Part'){
      await this.setState({ cameraView: !this.state.cameraView, partNumber: input})
    }
  }

  hideTask = () => {
    this.setState({ selectedTask: null });
  };

  renderTask = () => {
    if (this.state.cameraView){
      return <TakePhoto
        inputIndicator={this.state.inputIndicator}
        toggleCamera={this.toggleCamera}
        cameraOffAndSetInput={this.cameraOffAndSetInput}
        />
    }

    switch (this.state.selectedTask) {
      case "Start Job":
        return <StartJob
        jobNumber={this.state.jobNumber}
        toggleCamera={this.toggleCamera}
        cameraView={this.state.cameraView}
        hideTask={this.hideTask}
        partNumber={this.state.partNumber}
        machine={this.props.machine}
        />;
      case "Job List":
        return <JobList
        hideTask={this.hideTask}
        chats={this.props.chats}
        //must import all job numbers after fetch in app
        />
      case "Preparation Checklist":
        return <PreparationChecklist
        machine={this.props.machine} savePrepChecklists={this.props.savePrepChecklists} hideTask={this.hideTask}jobNumber={this.state.jobNumber} chats={this.props.chats}
        displayAllJobNumbers={this.displayAllJobNumbers}
        />;
      case "Inspection":
        return <Inspection machine={this.props.machine} hideTask={this.hideTask} />;
      case "Timer":
        return <Timer machine={this.props.machine} setDeviceTimer={this.props.setDeviceTimer} hideTask={this.hideTask} />;
      default:
        return "";
    }
  };

  render = () => {
    const buttonTypes = [
      "Start Job",
      "Preparation Checklist",
      "Inspection",
      "Timer"
    ];

    return (
      <div className="machine-container">
        <div className="machine-header">
          <span
            className="back-icon machine"
            onClick={this.props.toggleMachineSelection(null)}
          >
            &lsaquo;
          </span>
          <h1 className="machine-name">
            {this.props.machine.name}
          </h1>
        </div>
        <img src="./assets/machine.png" alt="MachinePNG" />
        <div className="machine-buttons-container">
          {buttonTypes.map((butTyp, idx) => (
            <Button key={idx} type={butTyp} displayTask={this.displayTask} />
          ))}
        </div>
        <div>{!this.state.selectedTask ? "" : this.renderTask()}</div>
      </div>
    );
  };
}

const Button = props => {
  return (
    <div
      className="machine-button-container"
      onClick={props.displayTask(props.type)}
    >
      <p>{props.type}</p>
    </div>
  );
};

export default Machine
