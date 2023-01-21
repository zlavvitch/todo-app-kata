import PropTypes from "prop-types";

import Task from "../Task";

import "./TaskList.css";

function TaskList({
  data,
  onDelete,
  onEdit,
  onToggleChecked,
  handleInputChange,
  handleTimerChange,
  setPaused,
  setPlay,
}) {
  const elements = data.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <Task
        key={id}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...itemProps}
        onDelete={() => onDelete(id)}
        onEdit={() => onEdit(id)}
        onToggleChecked={() => onToggleChecked(id)}
        handleInputChange={handleInputChange(id)}
        handleTimerChange={handleTimerChange(id)}
        setPaused={() => setPaused(id)}
        setPlay={() => setPlay(id)}
      />
    );
  });

  TaskList.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        taskValue: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        checked: PropTypes.bool.isRequired,
        editing: PropTypes.bool.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        minValue: PropTypes.number.isRequired,
        secValue: PropTypes.number.isRequired,
        paused: PropTypes.bool.isRequired,
      })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onToggleChecked: PropTypes.func.isRequired,
    handleTimerChange: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
  };

  return <ul className="todo-list">{elements} </ul>;
}

export default TaskList;
