import { Component, createRef } from "react";

class OutsideClickHandler extends Component {
  wrapperRef = createRef();

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    outsideClick: () => {},
    onkeyEsc: () => {},
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleEventClick);
    document.addEventListener("keydown", this.handleEventOnkey);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleEventClick);
    document.removeEventListener("keydown", this.handleEventOnkey);
  }

  handleEventClick = (event) => {
    const { outsideClick } = this.props;

    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    )
      outsideClick();
  };

  handleEventOnkey = (event) => {
    const { onkeyEsc } = this.props;

    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target) &&
      event.keyCode === 27
    )
      onkeyEsc();
  };

  render() {
    const { children } = this.props;

    return <div ref={this.wrapperRef}>{children}</div>;
  }
}

export default OutsideClickHandler;
