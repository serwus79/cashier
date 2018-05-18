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
    const cashbox = {
      ...this.props.cashbox,
      [event.currentTarget.name]: event.currentTarget.value
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
        </form>
      </div>
    );
  }
}

export default CashboxEdit;
