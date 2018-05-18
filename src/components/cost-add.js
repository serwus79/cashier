import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";

class CostAdd extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();

  static propTypes = {
    addCost: PropTypes.func
  };

  createCost = event => {
    event.preventDefault();
    const cost = {
      price: parseFloat(this.priceRef.value.value),
      name: this.nameRef.value.value,
      id: uuid()
    };
    if (!isNaN(cost.price)) {
      this.props.addCost(cost);
      event.currentTarget.reset();
    }
  };
  render() {
    return (
      <form onSubmit={this.createCost}>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            name="name"
            ref={this.nameRef}
            placeholder="Nazwa kosztu"
            require="true"
          />
          <input
            type="number"
            step="0.01"
            className="form-control text-right"
            name="price"
            ref={this.priceRef}
            placeholder="Cena"
            require="true"
          />
          <div className="input-group-append w-25">
            <button
              className="btn btn-outline-secondary btn-block"
              type="button"
            >
              Dodaj
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default CostAdd;
