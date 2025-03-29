import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getUsersDataRedux,
  updateTaskAndProgressRedux,
} from "../../redux/actions/userActions";
import { addASpace } from "../../utils";
import MicrosoftLogo from "../../images/microsoftlogo.png";

const selectOptions = [
  { name: "Not Started" },
  { name: "In Progress" },
  { name: "Verifying" },
  { name: "Done" },
];
class EditNotes extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
      progress: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.userDetails !== undefined &&
      state.notes.length === 0 &&
      state.progress.length === 0
    ) {
      return {
        notes: props.userDetails.notes,
        progress: props.userDetails.progress,
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    const { history, loginSuccess } = this.props;

    if (loginSuccess === false) {
      return history.push("/");
    }

    return null;
  }

  setNotes = (e) => {
    const { value } = e.target;
    this.setState((state, props) => {
      return { notes: value };
    });
  };

  selectOption = (e) => {
    const { value } = e.target;

    this.setState({
      progress: value,
    });
  };

  goBack = () => {
    const { history, getTableData } = this.props;
    history.push("/employees");
    getTableData();
  };

  submitDetails = () => {
    const { updateTaskAndProgressFuncProp, userDetails, history } = this.props;
    const { notes, progress } = this.state;
    const {
      name,
      lastName,
      userName,
      personalEmail,
      phoneNumber,
      companyEmail,
      companyNumber,
      slackID,
      salary,
      companyRole,
    } = userDetails;

    updateTaskAndProgressFuncProp(
      name,
      lastName,
      userName,
      personalEmail,
      phoneNumber,
      companyEmail,
      companyNumber,
      slackID,
      salary,
      companyRole,
      notes,
      progress
    );

    history.push("/employees");
  };

  render() {
    const { changedColorProp, userDetails } = this.props;
    const { notes, progress } = this.state;

    return (
      <div className="flexbox-column" id="align-text">
        <img src={MicrosoftLogo} width={"50px"} height={"50px"} />
        <h1>Edit Employee Notes</h1>
        <div className="flex-box-row">
          <h3>
            Name: {userDetails === undefined ? null : userDetails.name}{" "}
            {userDetails === undefined ? null : addASpace(userDetails.lastName)}
          </h3>
        </div>
        <button
          type="button"
          className={
            changedColorProp === true ? "client-button-two" : "client-button"
          }
          onClick={this.goBack}
        >
          Go Back
        </button>
        <select
          className="select-choice"
          onChange={this.selectOption}
          value={progress}
        >
          <option>Please choose a status</option>
          {selectOptions.map((value, i) => (
            <option key={i}>{value.name}</option>
          ))}
        </select>
        <textarea
          className="text-area-notes"
          name="notes"
          rows="30"
          cols="30"
          placeholder="Add your notes about your employees tasks this sprint here."
          onChange={this.setNotes}
          value={notes}
        ></textarea>
        <button
          className={
            changedColorProp === true ? "client-button-two" : "client-button"
          }
          style={{ marginTop: "1rem" }}
          type="button"
          onClick={this.submitDetails}
        >
          Submit
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loginSuccess: state.userReducer.loginSuccess,
    userDetails: state.userReducer.data[0],
    changedColorProp: state.userReducer.changedColor,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTableData: bindActionCreators(getUsersDataRedux, dispatch),
    updateTaskAndProgressFuncProp: bindActionCreators(
      updateTaskAndProgressRedux,
      dispatch
    ),
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditNotes)
);
