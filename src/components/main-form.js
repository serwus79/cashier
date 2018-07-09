import React from "react";
import PropTypes from "prop-types";

import base from "../base";

import CreateNewCashbox from "./create-new-cashbox";

class MainForm extends React.Component {
  state = {
    identifier: "",
    fingerprint: "",
    cashboxes: {},
    participates: {}
  };
  static propTypes = {
    history: PropTypes.object
  };
  componentDidMount() {
    const cashboxesLocalRef = localStorage.getItem("cashboxes");
    if (cashboxesLocalRef) {
      this.setState({ cashboxes: JSON.parse(cashboxesLocalRef) });
    }

    const cashboxesParticipatorRef = localStorage.getItem(
      "cashboxesParticipator"
    );
    if (cashboxesParticipatorRef) {
      console.log("ok");
      this.setState({ participates: JSON.parse(cashboxesParticipatorRef) });
    }
  }

  componentDidUpdate() {
    console.log("component updated");
    localStorage.setItem("cashboxes", JSON.stringify(this.state.cashboxes));
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addCashbox = cashbox => {
    console.log("addcashbox", cashbox);
    const cashboxes = { ...this.state.cashboxes };
    cashboxes[cashbox.id] = cashbox;
    this.setState({ cashboxes: cashboxes });
    window.location.href = `/cashbox/${cashbox.id}`;
  };
  render() {
    console.log(this.state.cashboxes);
    return (
      <div className="mx-auto w-50">
        <div class="alert alert-warning mt-2">
          <p>
            <b>Uwaga!!!</b> Już niedługo serwis testowy zostanie wyłączony.
          </p>
          <p>
            Nowy serwis jest uruchomiony pod adresem:{" "}
            <a href="https://www.zrzuta.infocity.pl">
              https://www.zrzuta.infocity.pl
            </a>
          </p>
        </div>

        {this.state.cashboxes && (
          <div>
            <h3>Twoje zbiórki</h3>
            <ul className="list-group">
              {Object.keys(this.state.cashboxes).map(key => (
                <li key={key} className="list-group-item">
                  <a href={`/cashbox/${key}`}>
                    {this.state.cashboxes[key].name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {this.state.participates && (
          <div className="mt-5">
            <h3>Uczestniczę</h3>
            <ul className="list-group">
              {Object.keys(this.state.participates).map(key => (
                <li key={key} className="list-group-item">
                  <a href={`/cashbox/${key}`}>
                    {this.state.participates[key].name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default MainForm;
