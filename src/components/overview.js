import React, { Component } from "react";
import Feed from "./feed";
import Machine from "./machine";

export default class Overview extends Component {
  state = {
    cells: this.props.cells,
    machineSelected: null,
  };

  selectMachine = (machInfo) => {
    return () => {
      this.props.toggleMachineSelection();
      this.setState({ machineSelected: machInfo })
    }
  }

  deselectMachine = () => {
    this.setState({ machineSelected: null })
  }

  render = () => {
    return (
      <div id="main" className="main-container">
        {
          !this.state.machineSelected ?
            <Feed
              cells={this.state.cells}
              currentCell={[0, this.state.cells[0]]}
              selectMachine={this.selectMachine}
            /> :
            <Machine
              machine={this.state.machineSelected}
              deselectMachine={this.deselectMachine}
              toggleMachineSelection={this.props.toggleMachineSelection}
            />
        }
      </div>
    )
  }
}
