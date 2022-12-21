import { Component } from "react";
import PropTypes from "prop-types";

import "./NewTaskFrom.css";

class NewTaskFrom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  onValueChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { onAdd } = this.props;
    const { value } = this.state;

    e.preventDefault();

    if (value.trim() !== "") {
      onAdd(value);
    }

    this.setState({
      value: "",
    });
  };

  render() {
    const { value } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={this.onValueChange}
          />
        </form>
      </header>
    );
  }
}

NewTaskFrom.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskFrom;
