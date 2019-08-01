import React, { Component } from "react";
import Feed from "./feed";
import Machine from "./machine";

export default class Overview extends Component {
  state = {
    cells: [],
    machineSelected: null,
  };

  componentDidMount = () => {
    this.fetchData("./data.json").then(data => {
      this.setState({
        cells: data,
      });
    });
  };

  fetchData = async url => {
    const res = await fetch(url);
    return res.json();
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
      <div>
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
