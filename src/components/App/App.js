import { Component } from "react";

import NewTaskFrom from "../NewTaskFrom";
import TaskList from "../TaskList";
import Footer from "../Footer";
import OutsideClickHandler from "../OutsideClickHandler";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {
        100: {
          id: 100,
          value: "Drink Coffee",
          checked: false,
          editing: false,
          sec: 0,
          date: new Date(),
        },
        101: {
          id: 101,
          value: "Sleep",
          checked: false,
          editing: false,
          date: new Date(),
          sec: 0,
        },
        102: {
          id: 102,
          value: "Eat",
          checked: false,
          editing: false,
          date: new Date(),
          sec: 0,
        },
      },
      timerMap: {
        100: "",
        101: "",
        102: "",
      },
      filterName: "",
    };

    this.maxId = 103;
  }

  addTask = (value, sec) => {
    const newTask = {
      id: this.maxId++,
      value,
      sec,
      checked: false,
      editing: false,
      date: new Date(),
    };

    const timerStart = (id) => this.handlerStartTimer(id);

    this.setState(({ tasks }, { timerMap }) => ({
      tasks: { ...tasks, [newTask.id]: newTask },
      timerMap: {
        ...timerMap,
        [newTask.id]: timerStart(newTask.id),
      },
    }));
  };

  handleInputChange = (id) => (value) => {
    this.setState(({ tasks }) => ({
      tasks: { ...tasks, [id]: { ...tasks[id], value } },
    }));
  };

  handlerStartTimer = (id) => {
    this.timerId = setInterval(() => this.handleTimerChange(id), 1000);

    return this.timerId;
  };

  handleTimerChange = (id) => {
    const { timerMap } = this.state;
    const { tasks } = this.state;
    const finished = tasks[id].sec === 0;

    if (finished) {
      clearInterval(timerMap[id]);
      this.setState({ timerMap: { ...timerMap, [id]: "" } });
      return;
    }

    this.setState({
      tasks: { ...tasks, [id]: { ...tasks[id], sec: tasks[id].sec - 1 } },
    });
  };

  setPaused = (id) => {
    const { timerMap } = this.state;

    clearInterval(timerMap[id]);
    this.setState({ timerMap: { ...timerMap, [id]: "" } });
  };

  setPlay = (id) => {
    const { timerMap } = this.state;

    if (timerMap[id]) return;

    const timerStart = this.handlerStartTimer(id);
    this.setState({ timerMap: { ...timerMap, [id]: timerStart } });
  };

  onEdit = (id) => {
    this.setState(({ tasks }) => ({
      tasks: {
        ...tasks,
        [id]: { ...tasks[id], editing: !tasks[id].editing },
      },
    }));
  };

  onDeleteItem = (id) => {
    const { tasks, timerMap } = this.state;

    const newTasks = Object.keys(tasks).reduce((acc, key) => {
      if (key !== id) {
        acc[key] = tasks[key];
      }

      return acc;
    }, {});

    const newTimers = Object.keys(timerMap).reduce((acc, key) => {
      if (key !== id) {
        acc[key] = timerMap[key];
      }

      return acc;
    }, {});

    this.setState({ tasks: newTasks, timerMap: newTimers });
  };

  onToggleChecked = (id) => {
    this.setState(({ tasks }) => ({
      tasks: {
        ...tasks,
        [id]: { ...tasks[id], checked: !tasks[id].checked },
      },
    }));
  };

  // eslint-disable-next-line class-methods-use-this
  filterObject = (tasksList, bool) =>
    Object.entries(tasksList).reduce((acc, task) => {
      const [key, value] = task;
      const { checked } = value;
      if (checked === bool) {
        acc[key] = value;
      }

      return acc;
    }, {});

  filterTask = (filterName) => {
    const { tasks } = this.state;

    switch (filterName) {
      case "active":
        return this.filterObject(tasks, false);

      case "complite":
        return this.filterObject(tasks, true);

      default:
        return tasks;
    }
  };

  countTasks = () => {
    const { tasks } = this.state;

    return Object.entries(tasks).reduce((acc, task) => {
      const [, value] = task;
      const { checked } = value;
      if (!checked) {
        return acc + 1;
      }

      return acc;
    }, 0);
  };

  onFilterSelect = (filterName) => {
    this.setState({ filterName });
  };

  onFilterComplited = () => {
    const { tasks } = this.state;
    const activeTasks = this.filterObject(tasks, false);

    this.setState({ tasks: activeTasks });
  };

  outsideClick = () => {
    const { tasks } = this.state;

    const newEditedTasks = Object.entries(tasks).reduce((acc, task) => {
      const [key, value] = task;
      const { editing } = value;

      if (editing) {
        acc[key] = { ...value, editing: !editing };
      } else {
        acc[key] = value;
      }

      return acc;
    }, {});

    this.setState({ tasks: newEditedTasks });
  };

  onkeyEsc = () => {
    const { tasks } = this.state;

    const newEditedTasks = Object.entries(tasks).reduce((acc, task) => {
      const [key, value] = task;
      const { editing } = value;

      if (editing) {
        acc[key] = { ...value, editing: !editing };
      } else {
        acc[key] = value;
      }

      return acc;
    }, {});

    this.setState({ tasks: newEditedTasks });
  };

  render() {
    const { tasks, filterName } = this.state;
    const active = this.countTasks(tasks);
    const visibleTasks = this.filterTask(filterName);

    return (
      <section className="todoapp">
        <OutsideClickHandler
          outsideClick={() => this.outsideClick()}
          onkeyEsc={() => this.onkeyEsc()}
        >
          <NewTaskFrom addTask={this.addTask} />
          <section className="main">
            <TaskList
              tasks={visibleTasks}
              onDelete={this.onDeleteItem}
              onEdit={this.onEdit}
              onToggleChecked={this.onToggleChecked}
              handleInputChange={this.handleInputChange}
              setPaused={this.setPaused}
              setPlay={this.setPlay}
            />
            <Footer
              active={active}
              filterName={filterName}
              onFilterSelect={this.onFilterSelect}
              onFilterComplited={this.onFilterComplited}
            />
          </section>
        </OutsideClickHandler>
      </section>
    );
  }
}
