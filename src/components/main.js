import React from "react";
import Feed from "./feed";
import Machine from "./machine";

const Main = props => {
  return (
    <div id="main" className="main-container">
      {!props.machineSelected ? (
        <Feed
          cells={props.cells}
          toggleMachineSelection={props.toggleMachineSelection}
        />
      ) : (
        <Machine
          machine={props.machineSelected}
          toggleMachineSelection={props.toggleMachineSelection}
        />
      )}
    </div>
  );
};

export default Main;
