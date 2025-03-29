import React from "react";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import arrayOfDates from "../../utils/time";
import {
  getSprintOptionsRedux,
  editSprintOptionsRedux,
} from "../../redux/actions/userActions";
import { differenceInTwoDays } from "../../utils";
import MicrosoftLogo from "../../images/microsoftlogo.png";

let todayTimeZone = new Date();
todayTimeZone.setDate(todayTimeZone.getDate());

let tomorrowFifthteenZone = new Date();
tomorrowFifthteenZone.setDate(tomorrowFifthteenZone.getDate() + 14);

const todaysArray = [{ date: todayTimeZone.toLocaleDateString() }];

class SprintOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sprintStartedDate: "",
      sprintEndDate: "",
      sprintLength: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.sprintOptions.sprintEndDate.length > 0 &&
      props.sprintOptions.sprintStartedDate.length > 0 &&
      (state.sprintStartedDate.length === 0) &
        (state.sprintEndDate.length === 0 && state.sprintLength.length === 0)
    ) {
      return {
        sprintStartedDate: todayTimeZone.toLocaleDateString(),
        sprintEndDate: tomorrowFifthteenZone.toLocaleDateString(),
        sprintLength: differenceInTwoDays(
          todayTimeZone.toLocaleDateString(),
          tomorrowFifthteenZone.toLocaleDateString()
        ),
      };
    }
    return null;
  }

  componentDidMount() {
    const { history, loginSuccess, getSprintOptionsFuncProp } = this.props;

    if (loginSuccess === false) {
      return history.push("/");
    }

    return getSprintOptionsFuncProp();
  }

  routeToEmployeesPage = () => {
    const { history } = this.props;
    history.push("/employees");
  };

  setValue = (e) => {
    const { value, name } = e.target;
    const { sprintEndDate } = this.state;

    if (name === "sprintStartedDate") {
      const datesDifference = differenceInTwoDays(value, sprintEndDate);
      return this.setState({
        sprintStartedDate: value,
        sprintLength: datesDifference,
      });
    }

    if (name === "sprintEndDate") {
      const datesDifference = differenceInTwoDays(
        todayTimeZone.toLocaleDateString(),
        value
      );
      return this.setState({
        sprintEndDate: value,
        sprintLength: datesDifference,
      });
    }
  };

  saveSprintOptions = () => {
    const { editSprintOptionsFuncProps, history } = this.props;
    const { sprintEndDate } = this.state;

    editSprintOptionsFuncProps(
      todayTimeZone.toLocaleDateString(),
      sprintEndDate
    );
    return history.push("/employees");
  };

  render() {
    const { changedColorProp, sprintOptions } = this.props;
    const { sprintStartedDate, sprintEndDate, sprintLength } = this.state;

    return (
      <div className="flexbox-column">
        <img src={MicrosoftLogo} width={"50px"} height={"50px"} />
        <h1>Sprint Options</h1>
        <button
          className={
            changedColorProp === true ? "client-button-two" : "client-button"
          }
          type="button"
          onClick={this.routeToEmployeesPage}
        >
          Go Back
        </button>

        <h2>Current Sprint Start Date: {sprintOptions.sprintStartedDate}</h2>
        <h2>Current Sprint End Date: {sprintOptions.sprintEndDate}</h2>
        <h2>
          Days Left In Current Sprint:&nbsp;
          {differenceInTwoDays(
            todayTimeZone.toLocaleDateString(),
            sprintOptions.sprintEndDate
          )}
        </h2>

        <h2>Select a new start date for your sprint</h2>

        <select
          className="select-choice"
          name="sprintStartedDate"
          onChange={this.setValue}
          value={sprintStartedDate}
        >
          {todaysArray.map((value, i) => (
            <option key={i}>{value.date}</option>
          ))}
        </select>
        <h2>Select a new end date for your sprint</h2>
        <select
          className="select-choice"
          name="sprintEndDate"
          onChange={this.setValue}
          value={sprintEndDate}
        >
          {arrayOfDates.map((value, i) => (
            <option key={i}>{value.date}</option>
          ))}
        </select>

        <h2>
          New Sprint Length:{" "}
          {sprintLength.length > 0
            ? `${sprintLength} days`
            : "You need to select two dates to know the length of the sprint."}
        </h2>

        <button
          className={
            changedColorProp === true ? "client-button-two" : "client-button"
          }
          type="button"
          onClick={this.saveSprintOptions}
        >
          Save Sprint Options
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    changedColorProp: state.userReducer.changedColor,
    loginSuccess: state.userReducer.loginSuccess,
    sprintOptions: state.userReducer.sprintOptions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSprintOptionsFuncProp: bindActionCreators(
      getSprintOptionsRedux,
      dispatch
    ),
    editSprintOptionsFuncProps: bindActionCreators(
      editSprintOptionsRedux,
      dispatch
    ),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SprintOptions)
);
