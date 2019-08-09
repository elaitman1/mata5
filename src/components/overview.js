import React from "react";
import Feed from "./feed";
import Machine from "./machine";

const Overview = props => {
  return (
    <div id="main" className="main-container">
      {
        !props.machineSelected ?
          <Feed
            cells={props.cells}
            currentCell={[0, props.cells[0]]}
            toggleMachineSelection={props.toggleMachineSelection}
          /> :
          <Machine
            machine={props.machineSelected}
            toggleMachineSelection={props.toggleMachineSelection}
          />
      }
    </div>
  )
}

export default Overview;
