import React, { Component } from "react";
import _ from "lodash";

export default class Inspection extends Component {
  state = {
    goodParts: 1,
    badParts: 1,
  }

  updatePartsNum = (type, oper) => {
    return () => {
      if (oper === "add") {
        this.setState(prevState => {
          return { [type]: prevState[type] + 1 };
        });
      } else if (oper === "minus" && this.state[type] > 0) {
        this.setState(prevState => {
          return { [type]: prevState[type] - 1 };
        });
      }
    }
  }

  update = (type) => {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.hideTask();
  }

  render = () => {
    const partsTypes = Object.keys(this.state);
    let good = this.state.goodParts !== "" ? parseInt(this.state.goodParts) : 0;
    let bad = this.state.badParts !== "" ? parseInt(this.state.badParts) : 0;
    let totalParts = _.sum([good, bad]);

    return (
      <div>
        <div className="overlay"></div>
        <form className="inspection-container" onSubmit={this.handleSubmit}>
          <h4>Inspection</h4>
          {
            partsTypes.map((partsType, idx) => {
              let type = _.capitalize(partsType.slice(0, partsType.length - 5));
              return (
                <PartsInput
                  key={idx}
                  type={type}
                  partsType={partsType}
                  numParts={this.state[partsType]}
                  update={this.update}
                  updatePartsNum={this.updatePartsNum}
                />
              )
            })
          }
          <div className="inspection-input-container">
            <p>Total Parts</p>
            <span className="inspection-parts-input">{totalParts}</span>
          </div>
          <div className="inspection-finish">
            <span>Skip</span>
            <input className="inspection-button" type="submit" value="Save" />
          </div>
        </form>
      </div>
    )
  }
}

const PartsInput = (props) => {
  return (
    <div className="inspection-input-container">
      <p>{props.type} Parts</p>
      <span className="inspection-parts-input">
        <div onClick={props.updatePartsNum(props.partsType, "minus")}>-</div>
        <input
          type="number"
          value={props.numParts}
          onChange={props.update(props.partsType)}
        />
        <div onClick={props.updatePartsNum(props.partsType, "add")}>+</div>
      </span>
    </div>
  )
}
