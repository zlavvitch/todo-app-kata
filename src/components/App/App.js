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
      data: [
        {
          taskValue: "Drink Coffee",
          id: 100,
          checked: false,
          editing: false,
          paused: false,
          finished: false,
          date: new Date(),
          minValue: 0,
          secValue: 20,
        },
        {
          taskValue: "Sleep",
          id: 101,
          checked: false,
          editing: false,
          paused: false,
          finished: false,
          date: new Date(),
          minValue: 59,
          secValue: 59,
        },
        {
          taskValue: "Eat",
          id: 103,
          checked: false,
          editing: false,
          paused: false,
          finished: false,
          date: new Date(),
          minValue: 10,
          secValue: 0,
        },
      ],

      filterName: "",
    };

    this.maxId = 1;
  }

  addItem = (taskValue, minValue, secValue) => {
    const newItem = {
      taskValue,
      checked: false,
      editing: false,
      paused: false,
      finished: false,
      id: this.maxId++,
      date: new Date(),
      minValue,
      secValue,
    };

    this.setState(({ data }) => {
      const newArr = [...data, newItem];

      return {
        data: newArr,
      };
    });
  };

  handleInputChange = (id) => (taskValue) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, taskValue };
        }

        return item;
      }),
    }));
  };

  handleTimerChange = (id) => (time) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          if (time.length > 1) {
            const [min, sec] = time;
            return { ...item, secValue: sec, minValue: min };
          }

          return { ...item, secValue: time };
        }

        return item;
      }),
    }));
  };

  mapMethodId = (name, id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [name]: !item[name] };
        }

        return item;
      }),
    }));
  };

  onEdit = (id) => {
    this.mapMethodId("editing", id);
  };

  deleteItem = (id) => {
    this.setState(({ data }) => ({
      data: data.filter((elem) => elem.id !== id),
    }));
  };

  onToggleChecked = (id) => {
    this.mapMethodId("checked", id);
  };

  // eslint-disable-next-line class-methods-use-this
  filterTask = (items, filterName) => {
    switch (filterName) {
      case "active":
        return items.filter((item) => !item.checked);

      case "complite":
        return items.filter((item) => item.checked);

      default:
        return items;
    }
  };

  onFilterSelect = (filterName) => {
    this.setState({ filterName });
  };

  onFilterComplited = () => {
    this.setState(({ data }) => ({
      data: data.filter((item) => !item.checked),
    }));
  };

  mapMethodTimer = (name, id, bool) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [name]: bool };
        }
        return item;
      }),
    }));
  };

  setPaused = (id) => {
    this.mapMethodTimer("paused", id, true);
  };

  setPlay = (id) => {
    this.mapMethodTimer("paused", id, false);
  };

  mapMethodEvent = () => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.editing) {
          return { ...item, editing: !item.editing };
        }

        return item;
      }),
    }));
  };

  onOutsideClick = () => {
    this.mapMethodEvent();
  };

  onOnkeyEsc = () => {
    this.mapMethodEvent();
  };

  render() {
    const { data, filterName } = this.state;

    const active = data.filter((item) => !item.checked).length;
    const visibleData = this.filterTask(data, filterName);

    return (
      <section className="todoapp">
        <OutsideClickHandler
          onOutsideClick={() => this.onOutsideClick()}
          onOnkeyEsc={() => this.onOnkeyEsc()}
        >
          <NewTaskFrom onAdd={this.addItem} />
          <section className="main">
            <TaskList
              data={visibleData}
              onDelete={this.deleteItem}
              onEdit={this.onEdit}
              onToggleChecked={this.onToggleChecked}
              handleInputChange={this.handleInputChange}
              handleTimerChange={this.handleTimerChange}
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
