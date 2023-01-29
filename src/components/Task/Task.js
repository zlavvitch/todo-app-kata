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
    const { task, onEdit } = this.props;

    e.preventDefault();

    if (task.value.trim() !== "") {
      onEdit(task.value);
    }
  };

  handleChange = (e) => {
    const { handleInputChange } = this.props;

    handleInputChange(e.target.value);
  };

  timeCheck = () => {
    const { task } = this.props;
    const { currentDate } = this.state;

    return formatDistance(task.date, currentDate, { includeSeconds: true });
  };

  onEscapeKey = (e) => {
    const { task, onEdit } = this.props;

    if (e.keyCode === 27) {
      onEdit(task.value);
    }
  };

  render() {
    const { task, onDelete, onEdit, onToggleChecked, setPaused, setPlay } =
      this.props;

    let className;
    if (task.checked) {
      className = "completed";
    } else if (task.editing) {
      className = "editing";
    } else {
      className = "";
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleChecked} />
          <label>
            <span className="title">{task.value}</span>
            <Timer sec={task.sec} setPaused={setPaused} setPlay={setPlay} />
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
            value={task.value}
            onChange={this.handleChange}
            onKeyDown={this.onEscapeKey}
          />
        </form>
      </li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    cheked: PropTypes.bool,
    editing: PropTypes.bool,
    sec: PropTypes.number,
    date: PropTypes.instanceOf(Date),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleChecked: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
};

export default Task;
