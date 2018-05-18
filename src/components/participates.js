import React from "react";
import PropTypes from "prop-types";

import AddParticipates from "./participateAdd";
import { cashboxPropType } from "./proptypes/cashbox";

class Participates extends React.Component {
  static propTypes = {
    cashbox: cashboxPropType,
    canEdit: PropTypes.bool,
    addParticipator: PropTypes.func
  };

  addParticipator = participator => {
    this.props.addParticipator(participator);
  };
  render() {
    return (
      <div className="cashbox-details">
        <AddParticipates AddParticipator={this.addParticipator} />

        {this.props.cashbox.participates && (
          <div>
            <ul className="list-group list-group-flush">
              {Object.keys(this.props.cashbox.participates).map(key => (
                <li key={key} className="list-group-item">
                  {this.props.cashbox.participates[key].name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Participates;
