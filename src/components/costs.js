import React from "react";
import PropTypes from "prop-types";

import CostAdd from "./cost-add";
import CostEdit from "./cost-edit";

import { cashboxPropType } from "./proptypes/cashbox";
import { formatPrice } from "../helpers";

class Costs extends React.Component {
  static propTypes = {
    cashbox: cashboxPropType,
    canEdit: PropTypes.bool,
    addCost: PropTypes.func
  };

  render() {
    let costsSum = 0;
    if (this.props.cashbox.costs) {
      for (const key in this.props.cashbox.costs) {
        if (this.props.cashbox.costs.hasOwnProperty(key)) {
          const cost = this.props.cashbox.costs[key];
          costsSum += parseFloat(cost.price);
        }
      }
    }
    let participatesCount = this.props.cashbox.participates
      ? Object.keys(this.props.cashbox.participates).length
      : 0;
    if (participatesCount === 0) {
      participatesCount = 1;
    }

    if (!this.props.canEdit) {
      return (
        <div className="cashbox-details">
          <div>
            <p>
              Suma: {formatPrice(costsSum)} / {participatesCount} osób
            </p>
            <p>Na osobę: {formatPrice(costsSum / participatesCount)}</p>
            <ul className="list-group list-group-flush">
              {this.props.cashbox.costs &&
                Object.keys(this.props.cashbox.costs).map(key => (
                  <li key={key} className="list-group-item">
                    <div>
                      <div className="w-25 text-right float-right">
                        {formatPrice(this.props.cashbox.costs[key].price)}
                      </div>
                      <div className="w-75">
                        {this.props.cashbox.costs[key].name}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="cashbox-details">
        <div>
          <p>Suma: {formatPrice(costsSum)}</p>
          <p>Na osobę: {formatPrice(costsSum / participatesCount)}</p>

          {this.props.cashbox.costs &&
            Object.keys(this.props.cashbox.costs).map(key => (
              <CostEdit
                key={key}
                index={key}
                cost={this.props.cashbox.costs[key]}
                updateCost={this.props.updateCost}
                removeCost={this.props.removeCost}
              />
            ))}
          <CostAdd addCost={this.props.addCost} />
        </div>
      </div>
    );
  }
}

export default Costs;
