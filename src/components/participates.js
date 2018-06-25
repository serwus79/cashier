import React from "react";
import PropTypes from "prop-types";

import AddParticipates from "./participateAdd";
import { cashboxPropType } from "./proptypes/cashbox";

class Participates extends React.Component {
  static propTypes = {
    identifier: PropTypes.string,
    cashbox: cashboxPropType.isRequired,
    canAdd: PropTypes.bool.isRequired,
    canEdit: PropTypes.bool.isRequired,
    addParticipator: PropTypes.func.isRequired,
    deleteParticipator: PropTypes.func.isRequired,
    cashSent: PropTypes.func,
    cashReceived: PropTypes.func,
  };

  render() {
    return (
      <div className="cashbox-details">
        <AddParticipates
          AddParticipator={this.props.addParticipator}
          canAdd={this.props.canAdd}
        />

        {this.props.cashbox.participates && (
          <div>
            <ul className="list-group list-group-flush">
              {Object.keys(this.props.cashbox.participates).map(key => (
                <li key={key} className="list-group-item">
                  <span className="float-right">
                    {false &&
                      this.canEdit && (
                        <span>
                          <button type="button" className="btn btn-success">
                            Otrzymane
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => this.props.deleteParticipator(key)}
                          >
                            Usuń
                          </button>
                        </span>
                      )}
                    {(this.props.canEdit ||
                      this.props.cashbox.participates[key].identifier ===
                      this.props.identifier) && (
                        <span>

                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => this.props.deleteParticipator(key)}
                          >
                            Usuń
                        </button>

                          {!this.props.cashbox.participates[key].sent && (
                            <button
                              className="btn btn-success" onClick={() => this.props.cashSent(key)}>
                              Zapłacono
                          </button>
                          )}
                          {this.props.canEdit && this.props.cashbox.participates[key].sent && !this.props.cashbox.participates[key].received && (
                            <button
                              className="btn btn-success" onClick={() => this.props.cashReceived(key)}>
                              Otrzymane
                          </button>
                          )}
                        </span>
                      )}
                  </span>
                  {this.props.cashbox.participates[key].name}
                  {(this.props.canEdit ||
                    this.props.cashbox.participates[key].identifier ===
                    this.props.identifier)
                    &&
                    (this.props.cashbox.participates[key].sent || this.props.cashbox.participates[key].received)
                    && (
                      <span>
                        <br /><span className="text-muted">{(this.props.cashbox.participates[key].received ? 'otrzymano' : 'wysłano')}</span>
                      </span>
                    )}
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
