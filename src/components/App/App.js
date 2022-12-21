import { Component } from "react";
import { formatDistanceToNow } from "date-fns";

import NewTaskFrom from "../NewTaskFrom";
import TaskList from "../TaskList";
import Footer from "../Footer";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          value: "Drink Coffe",
          id: 100,
          checked: false,
          editing: false,
          date: new Date(),
        },
      ],
      filter: "",
    };

    this.maxId = 1;
  }

  addItem = (value) => {
    const newItem = {
      value,
      checked: false,
      editing: false,
      id: this.maxId++,
      date: new Date(),
    };

    this.setState(({ data }) => {
      const newArr = [...data, newItem];

      return {
        data: newArr,
      };
    });
  };

  onEdit = (id) => (value) =>
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, value, editing: !item.editing };
        }

        return item;
      }),
    }));

  deleteItem = (id) => {
    this.setState(({ data }) => ({
      data: data.filter((elem) => elem.id !== id),
    }));
  };

  onToggleChecked = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        }

        return item;
      }),
    }));
  };

  onEditItem = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, editing: !item.editing };
        }

        return item;
      }),
    }));
  };

  // eslint-disable-next-line class-methods-use-this
  filterTask = (items, filter) => {
    switch (filter) {
      case "active":
        return items.filter((item) => !item.checked);

      case "complite":
        return items.filter((item) => item.checked);

      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  onFilterComplited = () => {
    this.setState(({ data }) => ({
      data: data.filter((item) => !item.checked),
    }));
  };

  // eslint-disable-next-line class-methods-use-this
  timeCheck = (date) => formatDistanceToNow(date, { includeSeconds: true });

  render() {
    const { data, filter } = this.state;
    const active = data.filter((item) => !item.checked).length;
    const visibleData = this.filterTask(data, filter);

    return (
      <section className="todoapp">
        <NewTaskFrom onAdd={this.addItem} />
        <section className="main">
          <TaskList
            data={visibleData}
            onDelete={this.deleteItem}
            onEditItem={this.onEditItem}
            onEdit={this.onEdit}
            onToggleChecked={this.onToggleChecked}
            timeCheck={this.timeCheck}
          />
          <Footer
            active={active}
            filter={filter}
            onFilterSelect={this.onFilterSelect}
            onFilterComplited={this.onFilterComplited}
          />
        </section>
      </section>
    );
  }
}
