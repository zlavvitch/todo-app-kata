import React, { Component } from "react";
import PropTypes from "prop-types";

import "./NewTaskFrom.css";

class NewTaskFrom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      min: "",
      sec: "",
    };

    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  onValueChange = (e) => {
    const targetName = e.target.name;
    const regex = /^0*(?:[0-5][0-9]?|59)$/;
    let inputValue;

    if (targetName === "task" && e.target.value.trim() !== "") {
      inputValue = e.target.value;
    } else if (regex.test(e.target.value, 10)) {
      inputValue = parseInt(e.target.value, 10);
    } else {
      inputValue = "";
    }

    this.setState({
      [targetName]: inputValue,
    });
  };

  onSubmit = (e) => {
    const { addTask } = this.props;
    const { task, sec, min } = this.state;

    e.preventDefault();

    if (task && (min || min === 0) && (sec || sec === 0)) {
      const seconds = Math.floor(min * 60 + sec);
      addTask(task, seconds);
    } else {
      return;
    }

    this.setState({
      task: "",
      min: "",
      sec: "",
    });
  };

  render() {
    const { task, min, sec } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            name="task"
            className="new-todo"
            placeholder="Task"
            value={task}
            onChange={this.onValueChange}
            ref={this.textInput}
            autoComplete="off"
          />
          <input
            name="min"
            className="new-todo-form__timer"
            placeholder="Min"
            value={min}
            onChange={this.onValueChange}
            autoComplete="off"
          />
          <input
            name="sec"
            className="new-todo-form__timer"
            placeholder="Sec"
            value={sec}
            onChange={this.onValueChange}
            autoComplete="off"
          />
          <input type="submit" className="new-todo-form__submit" />
        </form>
      </header>
    );
  }
}

NewTaskFrom.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskFrom;
