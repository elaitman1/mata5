import React, { Component } from "react";
import Confirmation from "./confirmation";

export default class PreparationChecklist extends Component {
  state = {
    cells: {
      Machining: {
        "Clean Chamber": false,
        "Tool Offset": false
      },
      Preparation: {
        "Job Spec Confirmation": false,
        "Revise CAD Modeling": false,
        "Edit Toolpath": false
      },
      Note: ""
    },
    cellSelected: "Machining",
    displayNote: false,
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

  update = e => {
    let newCells = this.state.cells;
    newCells.Note = e.currentTarget.value;
    this.setState({ cells: newCells });
  };

  toggleConfirmation = () => {
    this.setState({ showConfirmation: !this.state.showConfirmation });
  };

  handleSaveChecklist = () => {
    this.toggleConfirmation();
  };

  toggleChecklist = checkList => {
    return () => {
      let newCells = this.state.cells;
      let bool = newCells[this.state.cellSelected][checkList];
      newCells[this.state.cellSelected][checkList] = bool ? false : true;
      this.setState({ cells: newCells });
    };
  };

  toggleNote = () => {
    this.setState({ displayNote: !this.state.displayNote });
  };

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
      } else if (cell === "Note") {
        return (
          <span key={idx} id={cell} className="cell" onClick={this.toggleNote}>
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

  renderTask = () => {
    if (this.state.showConfirmation) {
      return (
        <Confirmation
          task="Preparation Checklist"
          hideTask={this.props.hideTask}
          toggleConfirmation={this.toggleConfirmation}
        />
      );
    } else {
      return (
        <div>
          <div className="overlay" />
          <div className="preparation-checklist-container">
            <h4>Start Job</h4>
            <header className="preparation-checklist-cells-container">
              {this.renderCells()}
            </header>
            <section className="preparation-checklist-body">
              <div className="preparation-checklist-buttons-container">
                {Object.keys(this.state.cells[this.state.cellSelected]).map(
                  (checkList, idx) => (
                    <Button
                      key={idx}
                      type={checkList}
                      toggleChecklist={this.toggleChecklist}
                      bool={
                        this.state.cells[this.state.cellSelected][checkList]
                      }
                    />
                  )
                )}
              </div>
              <button
                className="form-submit-button"
                onClick={this.handleSaveChecklist}
              >
                Save
              </button>
              {this.state.displayNote ? (
                <div>
                  <div className="preparation-checklist-note-overlay" />
                  <div className="preparation-checklist-note-container">
                    <h5>Add Note</h5>
                    <textarea
                      value={this.state.cells.Note}
                      onChange={this.update}
                    />
                    <button
                      className="form-submit-button"
                      onClick={this.toggleNote}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </section>
          </div>
        </div>
      );
    }
  };

  render = () => {
    return (
      <div>
        <div className="overlay" />
        {this.renderTask()}
      </div>
    );
  };
}

const Button = props => {
  return (
    <div
      id={props.type}
      className="preparation-checklist-button-container"
      style={{
        backgroundImage: props.bool
          ? "radial-gradient(circle at 50% 50%, #FFFFFF, #2E5BFF)"
          : ""
      }}
      onClick={props.toggleChecklist(props.type)}
    >
      <p>{props.type}</p>
    </div>
  );
};
