import React from "react";
import PropTypes from "prop-types";
import { cashboxPropType } from "./proptypes/cashbox";

class CashboxEdit extends React.Component {
  static propTypes = {
    cashbox: cashboxPropType,
    canEdit: PropTypes.bool,
    addToCashbox: PropTypes.func
  };

  handleChange = event => {
    const target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    if (target.type === "number") {
      value = parseFloat(target.value);
      if (isNaN(value)) {
        value = 0;
      }
    }
    const cashbox = {
      ...this.props.cashbox,
      [target.name]: value
    };
    this.props.updateCashbox(cashbox);
  };

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control form-control-lg mt-1"
              value={this.props.cashbox.name}
              onChange={this.handleChange}
              required="true"
            />
          </div>
          <div className="form-group">
            <textarea
              name="desc"
              value={this.props.cashbox.desc}
              onChange={this.handleChange}
              className="form-control"
              rows="5"
            />
          </div>
          <div className="form-group" />
        </form>
      </div>
    );
  }
}

export default CashboxEdit;
