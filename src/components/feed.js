import React, { Component } from "react";
import FeedItem from "./feedItem";

export default class Feed extends Component {
  state = {
    currentCell: this.props.currentCell,
    firstCellSelection: true,
  };

  selectCell = cellArr => {
    return () => {
      if (this.state.firstCellSelection) {
        this.setState({ firstCellSelection: false });
      }
      document.getElementById(this.state.currentCell[0]).className = "cell";
      document.getElementById(cellArr[0]).className = "cell selected";
      this.setState({ currentCell: cellArr });
    };
  };

  renderCells = () => {
    return this.props.cells.map((cell, idx) => {
      if (this.state.firstCellSelection && idx === 0) {
        return (
          <span
            key={idx}
            id={idx}
            className="cell selected"
            onClick={this.selectCell([idx, cell])}
          >
            {cell.cellName}
          </span>
        );
      } else {
        return (
          <span
            key={idx}
            id={idx}
            className="cell"
            onClick={this.selectCell([idx, cell])}
          >
            {cell.cellName}
          </span>
        );
      }
    });
  };

  renderFeedItem = () => {
    let currentCell = [];
    if (this.props.currentCell[1] && !this.state.currentCell[1]) {
      currentCell = this.props.currentCell[1].machineStuff;
    } else if (this.state.currentCell[1]) {
      currentCell = this.state.currentCell[1].machineStuff;
    }

    return currentCell.map((machSpecs, idx) => (
      <FeedItem
        key={idx}
        machSpecs={machSpecs}
        selectMachine={this.props.selectMachine}
      />
    ));
  };

  render = () => {
    return (
      <div className="feed-container">
        <header className="cells-container">{this.renderCells()}</header>
        <section className="feed-items-container">{this.renderFeedItem()}</section>
      </div>
    );
  };
}
