import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
import fing from "fingerprintjs2";

import base from "../base";

import CreateNewCashbox from "./create-new-cashbox";

class MainForm extends React.Component {
  state = {
    identifier: "",
    fingerprint: "",
    cashboxes: {}
  };
  static propTypes = {
    history: PropTypes.object
  };
  componentDidMount() {
    const cashboxesLocalRef = localStorage.getItem("cashboxes");
    if (cashboxesLocalRef) {
      this.setState({ cashboxes: JSON.parse(cashboxesLocalRef) });
    }
    this.getFingerprint().then(fingerprint => {
      this.setState({ fingerprint });
      this.getIdentifierByFingerprint(fingerprint).then(async result => {
        console.log("fingerprint data: ", result);
        let identifier = "";
        if (result && result.identifier) {
          identifier = result.identifier;
          await this.setIdentifier(result.identifier);
        } else {
          identifier = uuid();
          await this.setIdentifier(identifier);
        }
        await this.setFingerprint(fingerprint, {
          identifier: identifier,
          ts: new Date().getTime()
        });
        this.ref = base.syncState(identifier + `/cashboxes`, {
          context: this,
          state: "cashboxes"
        });
      });
    });
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
        resolve();
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
  };
  render() {
    console.log(this.state.cashboxes);
    return (
      <div>
        <CreateNewCashbox addCashbox={this.addCashbox} />
        {this.state.cashboxes && (
          <ol>
            {Object.keys(this.state.cashboxes).map(key => (
              <li key={key}>
                <a href={`/cashbox/${key}`}>{this.state.cashboxes[key].name}</a>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }
}

export default MainForm;
