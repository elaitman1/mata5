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
    showConfirmation: false,
    editNote: null
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

  update = (value) => {
    let newCells = this.state.cells;
    newCells[this.state.cellSelected][this.state.editNote] = value;
    this.setState({ cells: newCells });
  };

  toggleConfirmation = () => {
    this.setState({ showConfirmation: !this.state.showConfirmation });
  }

  openNote = type => {
    return () => {
      this.setState({ editNote: type });
    }
  }

  closeNote = () => {
    this.setState({ editNote: null });
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
                    <Button key={idx} type={butTyp} openNote={this.openNote} />
                  ))}
                </div> : ""
              }
              <button className="form-submit-button" onClick={this.toggleConfirmation}>Save</button>
            </section>
          </div>
          {
            this.state.editNote
              ?
            <Note
              note={this.state.editNote}
              noteInput={this.state.cells[this.state.cellSelected][this.state.editNote]}
              closeNote={this.closeNote}
              update={this.update} />
              :
            ""
          }
        </div>
      )
    }
  };
}

const Button = props => {
  return (
    <div
      className="preparation-checklist-button-container"
      onClick={props.openNote(props.type)}
    >
      <p>{props.type}</p>
    </div>
  );
};

const Note = props => {
  const update = e => {
    props.update(e.currentTarget.value);
  };

  return (
    <div>
      <div className="preparation-checklist-note-overlay"></div>
      <div className="preparation-checklist-note-container">
        <h4>{props.note} Note</h4>
        <input type="textarea" value={props.noteInput} onChange={update}/>
        <button className="form-submit-button" onClick={props.closeNote}>Save</button>
      </div>
    </div>
  )
}
