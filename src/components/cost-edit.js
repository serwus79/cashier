import React from "react";
import PropTypes from "prop-types";

import { costPropType } from "./proptypes/cashbox";

class CostEdit extends React.Component {
  static propTypes = {
    cost: costPropType,
    index: PropTypes.string,
    updateCost: PropTypes.func
  };

  handleChange = event => {
    const updatedCost = {
      ...this.props.cost,
      [event.currentTarget.name]: event.currentTarget.value
    };
    if (event.currentTarget.name === "price") {
      updatedCost.price = parseFloat(event.currentTarget.value);
    }
    this.props.updateCost(this.props.index, updatedCost);
  };
  render() {
    return (
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          name="name"
          value={this.props.cost.name}
          onChange={this.handleChange}
          placeholder="Nazwa kosztu"
          required="true"
        />
        <input
          className="form-control text-right"
          type="number"
          step="0.01"
          name="price"
          value={this.props.cost.price}
          placeholder="Cena"
          onChange={this.handleChange}
          required="true"
        />
        <div className="input-group-append w-25">
          <button
            className="btn btn-danger btn-block"
            type="button"
            onClick={() => this.props.removeCost(this.props.index)}
          >
            Usuń
          </button>
        </div>
      </div>
    );
  }
}

export default CostEdit;
