import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";

class CreateNewCashbox extends React.Component {
  cashboxName = React.createRef();
  static propTypes = {
    addCashbox: PropTypes.func
  };

  createCashbox = event => {
    event.preventDefault();
    const cashbox = {
      name: this.cashboxName.current.value,
      id: uuid()
    };
    if (!cashbox.name) {
      //nie dodajemy pustej zbiórki
      return;
    }
    cashbox.desc = "";
    this.props.addCashbox(cashbox);
    //this.props.history.push(`/cashbox/${cashboxId}`);
  };
  render() {
    return (
      <form
        className="store-selector text-center"
        onSubmit={this.createCashbox}
      >
        <h2>Utwórz nową zbiórkę</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            ref={this.cashboxName}
            required
            placeholder="Nazwa zbiórki"
            defaultValue=""
            maxLength={200}
            className="form-control form-control-lg"
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Start
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default CreateNewCashbox;
