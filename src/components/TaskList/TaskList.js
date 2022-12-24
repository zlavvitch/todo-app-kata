import PropTypes from "prop-types";

import Task from "../Task";

import "./TaskList.css";

function TaskList({ data, onDelete, onEdit, onEditItem, onToggleChecked }) {
  const elements = data.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <Task
        key={id}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...itemProps}
        onDelete={() => onDelete(id)}
        onEdit={onEdit(id)}
        onEditItem={() => onEditItem(id)}
        onToggleChecked={() => onToggleChecked(id)}
      />
    );
  });

  TaskList.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        checked: PropTypes.bool.isRequired,
        editing: PropTypes.bool.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
      })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onToggleChecked: PropTypes.func.isRequired,
  };

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
