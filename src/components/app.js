import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
import fing from "fingerprintjs2";

import base, { firebaseApp } from "../base";
import Cashbox from "./cashbox";
import Participates from "./participates";
import Costs from "./costs";

class App extends React.Component {
  state = {
    identifier: "",
    cashboxes: {},
    cashbox: {},
    loading: true
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match;
    // Odczytanie identifier
    this.getFingerprint().then(fingerprint => {
      this.setState({ fingerprint });
      this.getIdentifierByFingerprint(fingerprint).then(async result => {
        console.log("fingerprint data: ", result);
        let identifier = "";
        let uid = "";
        if (result && result.identifier) {
          identifier = result.identifier;
          uid = await this.setIdentifier(result.identifier);
        } else {
          identifier = uuid();
          uid = await this.setIdentifier(identifier);
        }
        await this.setFingerprint(fingerprint, {
          identifier: identifier,
          ts: new Date().getTime()
        });
        //Aktualizacja zbiórki
        this.ref = base.syncState(`cashboxes/${params.cashboxId}`, {
          context: this,
          state: "cashbox",
          then: () => {
            if (!this.state.cashbox || !this.state.cashbox.id) {
              const params = this.props.match.params;
              if (this.state.cashboxes[params.cashboxId]) {
                let cashbox = { ...this.state.cashboxes[params.cashboxId] };
                cashbox.uid = uid;
                cashbox.desc = "";
                this.setState({ cashbox: cashbox });
              }
            }
            this.setState({ loading: false });
          }
        });
      });
    });

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
  }
  componentDidUpdate() {
    //localStorage.setItem("cashbox", JSON.stringify(this.state.cashbox));
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  getFingerprint() {
    return new Promise((resolve, reject) => {
      try {
        new fing().get(function(result, components) {
          resolve(result);
        });
      } catch (e) {
        resolve(null);
      }
    });
  }
  getIdentifierByFingerprint(fingerprint) {
    return new Promise((resolve, reject) => {
      console.log("ref", base);

      base
        .fetch(`fingerprints/${fingerprint}`, {
          context: this
        })
        .then(result => {
          resolve(result);
        });
    });
  }
  setIdentifier(identifier) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("identifier", identifier);
      this.setState({ identifier }, () => {
        firebaseApp
          .auth()
          .signInAnonymouslyAndRetrieveData()
          .then(
            result => {
              this.setState({ uid: result.user.uid });
              resolve(result.user.uid);
            },
            error => {
              //var errorCode = error.code;
              //var errorMessage = error.message;
              if (error.code === "auth/invalid-custom-token") {
                alert("The token you provided is not valid.");
              } else {
                console.error(error);
              }
              reject(error);
            }
          );
      });
    });
  }
  setFingerprint(fingerprint, data) {
    return new Promise((resolve, reject) => {
      base.post(`fingerprints/${fingerprint}`, { data: data }).then(
        result => {
          resolve();
        },
        error => {
          reject();
        }
      );
    });
  }

  updateCashbox = cashbox => {
    if (!this.canEditCashbox()) {
      return;
    }
    let updatedCashbox = Object.assign({}, this.state.cashbox, cashbox);
    console.log("updated cashbox", updatedCashbox);
    this.setState({ cashbox: updatedCashbox });
  };
  addParticipator = participator => {
    if (!this.canAddParticipator()) {
      return;
    }
    let cashbox = { ...this.state.cashbox };
    if (!cashbox.participates) {
      cashbox.participates = {};
    }
    participator.identifier = this.state.identifier;
    cashbox.participates["" + new Date().getTime()] = participator;
    if (!cashbox.somearray) {
      cashbox.somearray = [];
    }
    cashbox.somearray.push({
      id: new Date().getTime(),
      name: "name " + new Date().getTime()
    });
    this.setState({ cashbox });
  };
  canModifyParticipator = index => {
    if (
      !this.state.cashbox ||
      !this.state.cashbox.participates ||
      !this.state.cashbox.participates[index]
    ) {
      return false;
    }
    if (
      this.canEditCashbox() ||
      this.state.identifier ===
        this.state.cashbox.participates[index].identifier
    ) {
      return true;
    }

    return false;
  };
  canDelete = index => {
    return (
      this.canEditCashbox() ||
      this.state.cashbox.participates[index].identifier ===
        this.state.identifier
    );
  };
  deleteParticipator = index => {
    if (this.canModifyParticipator(index)) {
      let cashbox = { ...this.state.cashbox };
      cashbox.participates[index] = null; // null bo tak wymaga firebase?
      this.setState({ cashbox });
    }
  };

  participatorCashSent = index => {
    if (this.canModifyParticipator(index)) {
      let cashbox = { ...this.state.cashbox };
      cashbox.participates[index].sent = true;
      this.setState({ cashbox });
    }
  };
  participatorCashReceived = index => {
    if (this.canEditCashbox()) {
      let cashbox = { ...this.state.cashbox };
      cashbox.participates[index].received = true;
      this.setState({ cashbox });
    }
  };
  addCost = cost => {
    if (!this.canEditCashbox()) {
      return;
    }
    let cashbox = { ...this.state.cashbox };
    if (!cashbox.costs) {
      cashbox.costs = {};
    }
    cashbox.costs["" + new Date().getTime()] = cost;
    this.setState({ cashbox });
  };
  updateCost = (index, cost) => {
    if (!this.canEditCashbox()) {
      return;
    }
    let cashbox = { ...this.state.cashbox };
    cashbox.costs[index] = cost;
    this.setState({ cashbox });
  };
  removeCost = index => {
    if (!this.canEditCashbox()) {
      return;
    }
    let cashbox = { ...this.state.cashbox };
    cashbox.costs[index] = null; // null bo tak wymaga firebase?
    this.setState({ cashbox });
  };
  canEditCashbox() {
    return (
      this.state.cashbox != null &&
      this.state.cashboxes != null &&
      this.state.cashboxes[this.state.cashbox.id] != null &&
      this.state.uid === this.state.cashbox.uid
    );
  }
  canAddParticipator() {
    const canEdit = this.state.cashboxes[this.state.cashbox.id] != null;
    if (canEdit) {
      return true;
    }
    if (this.state.cashbox == null || this.state.cashbox.participates == null) {
      return false;
    }
    console.log("cashbox:", this.state.cashbox);
    for (const key in this.state.cashbox.participates) {
      if (this.state.cashbox.participates.hasOwnProperty(key)) {
        const element = this.state.cashbox.participates[key];
        if (element.identifier === this.state.identifier) {
          return false;
        }
      }
    }
    return true;
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="row">
          <div className="animationload">
            <div className="osahanloading" />
          </div>
        </div>
      );
    }
    const canEdit = this.canEditCashbox();
    console.log("canedit", canEdit);
    const canAddParticipator = this.canAddParticipator();
    return (
      <div className="row">
        <div className="col">
          <a href="/">Zmień</a>
          <Cashbox
            cashbox={this.state.cashbox}
            canEdit={canEdit}
            updateCashbox={this.updateCashbox}
          />
        </div>
        <div className="col">
          <h2>Składkowicze</h2>
          <Participates
            identifier={this.state.identifier}
            cashbox={this.state.cashbox}
            canAdd={canAddParticipator}
            canEdit={canEdit}
            addParticipator={this.addParticipator}
            deleteParticipator={this.deleteParticipator}
            cashSent={this.participatorCashSent}
            cashReceived={this.participatorCashReceived}
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
