import { Component, createRef } from "react";

class OutsideClickHandler extends Component {
  wrapperRef = createRef();

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    onOutsideClick: () => {},
    onOnkeyEsc: () => {},
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("keydown", this.handleOnkeyEsc);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleOnkeyEsc);
  }

  handleClickOutside = (event) => {
    const { onOutsideClick } = this.props;

    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      onOutsideClick();
    }
  };

  handleOnkeyEsc = (event) => {
    const { onOnkeyEsc } = this.props;

    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target) &&
      event.keyCode === 27
    ) {
      onOnkeyEsc();
    }
  };

  render() {
    const { children } = this.props;

    return <div ref={this.wrapperRef}>{children}</div>;
  }
}

export default OutsideClickHandler;
