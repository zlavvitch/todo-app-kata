import { Component } from "react";
import PropTypes from "prop-types";

import "./Timer.css";

class Timer extends Component {
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentDidUpdate(prevProps) {
    const { paused } = this.props;

    if (prevProps.paused === true && paused === false) {
      this.interval = setInterval(() => this.tick(), 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    const { minValue, secValue, paused, handleTimerChange } = this.props;

    let min;
    let sec;

    if (paused) {
      clearInterval(this.interval);
      return;
    }

    if (minValue === 0 && secValue === 0) {
      clearInterval(this.interval);
    } else if (secValue === 0) {
      sec = 59;
      min = minValue - 1;

      handleTimerChange([min, sec]);
    } else {
      sec = secValue - 1;

      handleTimerChange(sec);
    }
  };

  render() {
    const { secValue, minValue, setPaused, setPlay } = this.props;

    let min;
    let sec;

    if (minValue < 10) {
      min = `0${minValue}`;
    } else {
      min = minValue;
    }

    if (secValue < 10) {
      sec = `0${secValue}`;
    } else {
      sec = secValue;
    }

    return (
      <span className="description">
        <button
          className="icon icon-play"
          type="button"
          aria-label="Play"
          onClick={setPlay}
        />
        <button
          className="icon icon-pause"
          type="button"
          aria-label="Pause"
          onClick={setPaused}
        />
        {min}:{sec}
      </span>
    );
  }
}

Timer.propTypes = {
  minValue: PropTypes.number.isRequired,
  secValue: PropTypes.number.isRequired,
  setPaused: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
};

export default Timer;
