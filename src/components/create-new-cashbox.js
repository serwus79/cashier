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
      name: this.cashboxName.value.value,
      id: uuid()
    };
    this.props.addCashbox(cashbox);
    //this.props.history.push(`/cashbox/${cashboxId}`);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.createCashbox}>
        <h2>Utwórz nową zbiórkę</h2>
        <input
          type="text"
          ref={this.cashboxName}
          required
          placeholder="Nazwa zbiórki"
          defaultValue=""
        />
        <button type="submit">Start</button>
      </form>
    );
  }
}

export default CreateNewCashbox;
