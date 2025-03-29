import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { changeColorRedux } from "../../redux/actions/userActions";
import sunImage from "../../images/sun.png";
import moonImage from "../../images/moon.png";

class ChangeBackground extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  changeBackgroundColor = () => {
    const { changeBackgroundColorPropFunc } = this.props;

    changeBackgroundColorPropFunc();
    if (document.body.style.backgroundColor === "") {
      return (document.body.style.backgroundColor = "#1d2a35");
    }

    if (document.body.style.backgroundColor === "#1d2a35") {
      return (document.body.style.backgroundColor = "#016fd0");
    }

    if (document.body.style.backgroundColor === "rgb(1, 111, 208)") {
      return (document.body.style.backgroundColor = "#1d2a35");
    }

    if (document.body.style.backgroundColor === "rgb(29, 42, 53)") {
      return (document.body.style.backgroundColor = "#016fd0");
    }
  };

  render() {
    const { changedColorProp, stylesProp } = this.props;
    return (
      <img
        onClick={this.changeBackgroundColor}
        src={changedColorProp ? sunImage : moonImage}
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "40px",
          cursor: "pointer",
          ...stylesProp,
        }}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeBackgroundColorPropFunc: bindActionCreators(
      changeColorRedux,
      dispatch
    ),
  };
}

function mapStateToProps(state) {
  return {
    changedColorProp: state.userReducer.changedColor,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeBackground);
