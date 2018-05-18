import React from "react";
import PropTypes from "prop-types";

class AddParticipates extends React.Component {
  participatorName = React.createRef();
  static propTypes = {
    AddParticipator: PropTypes.func
  };
  addName = event => {
    event.preventDefault();
    const item = { name: this.participatorName.value.value };
    this.props.AddParticipator(item);
    // refresh the form
    event.currentTarget.reset();
  };
  render() {
    return (
      <form className="form" onSubmit={this.addName}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            ref={this.participatorName}
            defaultValue=""
            placeholder="Imię, nazwisko, ksywka"
            aria-label="Imię, nazwisko, ksywka"
            aria-describedby="basic-addon2 "
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              + Dodaj
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddParticipates;
