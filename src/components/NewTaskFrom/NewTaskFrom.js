import { Component } from "react";
import PropTypes from "prop-types";

import "./NewTaskFrom.css";

class NewTaskFrom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskValue: "",
      minValue: "",
      secValue: "",
    };
  }

  onValueChange = (e) => {
    const targetName = e.target.name;
    const regex = /^0*(?:[0-5][0-9]?|59)$/;
    let value;

    if (targetName === "taskValue" && e.target.value.trim() !== "") {
      value = e.target.value;
    } else if (regex.test(e.target.value, 10)) {
      value = parseInt(e.target.value, 10);
    } else {
      value = "";
    }

    this.setState({
      [targetName]: value,
    });
  };

  onSubmit = (e) => {
    const { onAdd } = this.props;
    const { taskValue, minValue, secValue } = this.state;

    e.preventDefault();

    if (
      taskValue &&
      (minValue || minValue === 0) &&
      (secValue || secValue === 0)
    ) {
      onAdd(taskValue, minValue, secValue);
    } else {
      return;
    }

    this.setState({
      taskValue: "",
      minValue: "",
      secValue: "",
    });
  };

  render() {
    const { taskValue, minValue, secValue } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            name="taskValue"
            className="new-todo"
            placeholder="Task"
            value={taskValue}
            onChange={this.onValueChange}
            autoComplete="off"
          />
          <input
            name="minValue"
            className="new-todo-form__timer"
            placeholder="Min"
            value={minValue}
            onChange={this.onValueChange}
            autoComplete="off"
          />
          <input
            name="secValue"
            className="new-todo-form__timer"
            placeholder="Sec"
            value={secValue}
            onChange={this.onValueChange}
            autoComplete="off"
          />
          <input type="submit" className="new-todo-form__submit" hidden />
        </form>
      </header>
    );
  }
}

NewTaskFrom.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskFrom;
