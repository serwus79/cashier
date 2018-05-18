import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";

import base from "../base";
import Cashbox from "./cashbox";
import Participates from "./participates";
import Costs from "./costs";

class App extends React.Component {
  state = {
    identifier: "",
    cashboxes: {},
    cashbox: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match;
    // Odczytanie identifier
    let identifierRef = localStorage.getItem("identifier");
    if (!identifierRef) {
      identifierRef = uuid();
      localStorage.setItem("identifier", identifierRef);
    }
    this.setState({ identifier: identifierRef });
    const myCashboxesRef = localStorage.getItem("cashboxes");
    let myCashboxes = {};
    if (myCashboxesRef) {
      myCashboxes = JSON.parse(myCashboxesRef);
      this.setState({ cashboxes: myCashboxes });
    }

    // const cashboxRef = localStorage.getItem("cashbox");
    // let cashbox = {};
    // if (cashboxRef) {
    //   cashbox = JSON.parse(cashboxRef);
    // }

    //Aktualizacja zbiórki
    this.ref = base.syncState(`cashboxes/${params.cashboxId}`, {
      context: this,
      state: "cashbox",
      then: () => {
        if (!this.state.cashbox || !this.state.cashbox.id) {
          const params = this.props.match.params;
          if (this.state.cashboxes[params.cashboxId]) {
            let cashbox = { ...this.state.cashboxes[params.cashboxId] };
            cashbox.desc = "";
            this.setState({ cashbox: cashbox });
          }
        }
      }
    });
  }
  componentDidUpdate() {
    //localStorage.setItem("cashbox", JSON.stringify(this.state.cashbox));
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  updateCashbox = cashbox => {
    let updatedCashbox = Object.assign({}, this.state.cashbox, cashbox);
    console.log("updated cashbox", updatedCashbox);
    this.setState({ cashbox: updatedCashbox });
  };
  addParticipator = participator => {
    console.log("rootpart", participator);
    let cashbox = { ...this.state.cashbox };
    if (!cashbox.participates) {
      cashbox.participates = {};
    }
    cashbox.participates["" + new Date().getTime()] = participator;
    this.setState({ cashbox });
  };
  addCost = cost => {
    console.log("add cost", cost);
    let cashbox = { ...this.state.cashbox };
    if (!cashbox.costs) {
      cashbox.costs = {};
    }
    cashbox.costs["" + new Date().getTime()] = cost;
    this.setState({ cashbox });
  };
  updateCost = (index, cost) => {
    let cashbox = { ...this.state.cashbox };
    cashbox.costs[index] = cost;
    this.setState({ cashbox });
  };
  removeCost = index => {
    let cashbox = { ...this.state.cashbox };
    cashbox.costs[index] = null; // null bo tak wymaga firebase?
    this.setState({ cashbox });
  };
  render() {
    const canEdit = this.state.cashboxes[this.state.cashbox.id] != null;
    return (
      <div className="row">
        <div className="col">
          <Cashbox
            cashbox={this.state.cashbox}
            canEdit={canEdit}
            updateCashbox={this.updateCashbox}
          />
        </div>
        <div className="col">
          <h2>Składkowicze</h2>
          <Participates
            cashbox={this.state.cashbox}
            addParticipator={this.addParticipator}
          />
        </div>
        <div className="col">
          <h2>Podsumowanie kosztów</h2>
          <Costs
            cashbox={this.state.cashbox}
            addCost={this.addCost}
            canEdit={canEdit}
            updateCost={this.updateCost}
            removeCost={this.removeCost}
          />
        </div>
      </div>
    );
  }
}

export default App;
