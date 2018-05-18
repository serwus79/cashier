import React from "react";
import PropTypes from "prop-types";

import { cashboxPropType } from "./proptypes/cashbox";
import CashboxEdit from "./cashbox-edit";

class Cashbox extends React.Component {
  static propTypes = {
    cashbox: cashboxPropType,
    canEdit: PropTypes.bool,
    updateCashbox: PropTypes.func
  };
  render() {
    if (this.props.canEdit) {
      return (
        <CashboxEdit
          cashbox={this.props.cashbox}
          updateCashbox={this.props.updateCashbox}
        />
      );
    }
    return (
      <div>
        <div className="cashbox-details">
          <h1 className="cashbox-name">{this.props.cashbox.name}</h1>
          <p>{this.props.cashbox.desc}</p>
        </div>
      </div>
    );
  }
}

export default Cashbox;
