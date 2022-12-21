import PropTypes from "prop-types";

import TaskFilter from "../TaskFilter";

import "./Footer.css";

function Footer({ active, filter, onFilterSelect, onFilterComplited }) {
  return (
    <footer className="footer">
      <span className="todo-count">{active} items left</span>
      <TaskFilter filter={filter} onFilterSelect={onFilterSelect} />
      <button
        type="button"
        className="clear-completed"
        onClick={() => onFilterComplited()}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  filter: "all",
};

Footer.propTypes = {
  filter: PropTypes.string,
  onFilterSelect: PropTypes.func.isRequired,
  onFilterComplited: PropTypes.func.isRequired,
};

export default Footer;
