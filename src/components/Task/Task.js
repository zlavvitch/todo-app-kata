import { Component } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";

import Timer from "../Timer";

import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.handleDateChange(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleDateChange() {
    this.setState({
      currentDate: new Date(),
    });
  }

  onSubmit = (e) => {
    const { taskValue, onEdit } = this.props;

    e.preventDefault();

    if (taskValue.trim() !== "") {
      onEdit(taskValue);
    }
  };

  handleChange = (e) => {
    const { handleInputChange } = this.props;

    handleInputChange(e.target.value);
  };

  timeCheck = () => {
    const { date } = this.props;
    const { currentDate } = this.state;

    return formatDistance(date, currentDate, { includeSeconds: true });
  };

  onOnkeyEsc = (e) => {
    const { taskValue, onEdit } = this.props;

    if (e.keyCode === 27) {
      onEdit(taskValue);
    }
  };

  render() {
    const {
      checked,
      editing,
      onDelete,
      onEdit,
      onToggleChecked,
      taskValue,
      minValue,
      secValue,
      handleTimerChange,
      setPaused,
      setPlay,
      paused,
    } = this.props;

    let className;
    if (checked) {
      className = "completed";
    } else if (editing) {
      className = "editing";
    } else {
      className = "";
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleChecked} />
          <label>
            <span className="title">{taskValue}</span>
            <Timer
              minValue={minValue}
              secValue={secValue}
              paused={paused}
              handleTimerChange={handleTimerChange}
              setPaused={setPaused}
              setPlay={setPlay}
            />
            <span className="description">{`created ${this.timeCheck()} ago`}</span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={onEdit}
            aria-label="Edit"
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDelete}
            aria-label="Destroy"
          />
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            value={taskValue}
            onChange={this.handleChange}
            onKeyDown={this.onOnkeyEsc}
          />
        </form>
      </li>
    );
  }
}

Task.propTypes = {
  checked: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleChecked: PropTypes.func.isRequired,
  taskValue: PropTypes.string.isRequired,
  minValue: PropTypes.number.isRequired,
  secValue: PropTypes.number.isRequired,
  handleTimerChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
};

export default Task;
