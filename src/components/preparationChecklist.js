import React, { Component } from "react";
import Confirmation from "./confirmation";

export default class PreparationChecklist extends Component {
  state = {
    cells: {
      Machining: {
        "Clean Chamber": "",
        "Tool Offset Value": ""
      },
      Preparation: {
        "Job Spec Confirmation": "",
        "Revise CAD Modeling": "",
        "Edit Toolpath": ""
      },
      Offset: []
    },
    cellSelected: "Machining",
    firstCellSelection: true,
    showConfirmation: false
  };

  selectCell = cell => {
    return () => {
      if (this.state.firstCellSelection) {
        this.setState({ firstCellSelection: false });
      }
      document.getElementById(this.state.cellSelected).className = "cell";
      document.getElementById(cell).className = "cell selected";
      this.setState({ cellSelected: cell });
    };
  };

  toggleConfirmation = () => {
    this.setState({ showConfirmation: !this.state.showConfirmation });
  }

  renderCells = () => {
    return Object.keys(this.state.cells).map((cell, idx) => {
      if (this.state.firstCellSelection && idx === 0) {
        return (
          <span
            key={idx}
            id={cell}
            className="cell selected"
            onClick={this.selectCell(cell)}
          >
            {cell}
          </span>
        );
      } else {
        return (
          <span
            key={idx}
            id={cell}
            className="cell"
            onClick={this.selectCell(cell)}
          >
            {cell}
          </span>
        );
      }
    });
  };

  render = () => {
    if (this.state.showConfirmation) {
      return (
        <Confirmation
          task="Preparation Checklist"
          hideTask={this.props.hideTask}
          toggleConfirmation={this.toggleConfirmation}
        />
      )
    } else {
      return (
        <div>
          <div className="overlay"></div>
          <div className="preparation-checklist-container">
            <h4>Start Job</h4>
            <header className="preparation-checklist-cells-container">{this.renderCells()}</header>
            <section className="preparation-checklist-body">
              {
                this.state.cellSelected ?
                <div className="preparation-checklist-buttons-container">
                  {Object.keys(this.state.cells[this.state.cellSelected]).map((butTyp, idx) => (
                    <Button key={idx} type={butTyp} />
                  ))}
                </div> : ""
              }
              <button className="form-submit-button" onClick={this.toggleConfirmation}>Save</button>
            </section>
          </div>
        </div>
      )
    }
  };
}

const Button = props => {
  return (
    <div
      className="preparation-checklist-button-container"
    >
      <p>{props.type}</p>
    </div>
  );
};
