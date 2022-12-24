import { Component } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";

import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      // eslint-disable-next-line react/destructuring-assignment
      value: this.props.value,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.timer(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSubmit = (e) => {
    const { value } = this.state;
    const { onEdit } = this.props;

    e.preventDefault();

    if (value.trim() !== "") {
      onEdit(value);
    }
  };

  onValueChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  // eslint-disable-next-line class-methods-use-this
  timeCheck = () => {
    const { date } = this.props;
    const { currentDate } = this.state;

    return formatDistance(date, currentDate, { includeSeconds: true });
  };

  timer() {
    this.setState({
      currentDate: new Date(),
    });
  }

  render() {
    const {
      checked,
      editing,

      onDelete,
      onEditItem,
      onToggleChecked,
    } = this.props;

    const { value } = this.state;

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
            <span className="description">{value}</span>
            <span className="created">{`created ${this.timeCheck()} ago`}</span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={onEditItem}
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
            defaultValue={value}
            onChange={this.onValueChange}
          />
        </form>
      </li>
    );
  }
}

Task.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onToggleChecked: PropTypes.func.isRequired,
};

export default Task;
