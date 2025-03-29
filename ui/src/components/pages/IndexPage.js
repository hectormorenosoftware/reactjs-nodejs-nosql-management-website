import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChangeBackground from "../representational/ChangeBackground";
import Loading from "../representational/Loading";
import {
  getUsersDataRedux,
  getUserDataRedux,
  resetAllDataRedux,
  deleteEmployeeRedux,
  searchUserByNameRedux,
  searchByLastNameRedux,
  sortByFirstNameRedux,
  sortByLastNameRedux,
  getSprintOptionsRedux,
} from "../../redux/actions/userActions";
import { stringRegexPattern, addASpace } from "../../utils";
import MicrosoftLogo from "../../images/microsoftlogo.png";

let todayTime = new Date();
todayTime.setDate(todayTime.getDate());

class IndexPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      areYouSure: false,
      chosenArrayObjIndex: 0,
    };
  }
  componentDidMount() {
    const {
      data,
      history,
      loginSuccess,
      getSprintOptionsFuncProp,
      getDataIndexPage,
    } = this.props;

    if (loginSuccess === false) {
      return history.push("/");
    }

    if (data.length === 0) {
      getSprintOptionsFuncProp();
      return getDataIndexPage();
    }

    return null;
  }

  setInputValue = (e) => {
    const { value, name } = e.target;

    if (name === "name") {
      if (value.length >= 0) {
        const isFirstNameValid = stringRegexPattern.test(value);

        if (isFirstNameValid) {
          return this.setState({
            firstName: value,
          });
        }

        if (isFirstNameValid === false) {
          return this.setState({
            firstName: "",
          });
        }
      }
    }

    if (name === "lastName") {
      if (value.length >= 0) {
        const isLastNameValid = stringRegexPattern.test(value);

        if (isLastNameValid) {
          return this.setState({
            lastName: value,
          });
        }

        if (isLastNameValid === false) {
          return this.setState({
            lastName: "",
          });
        }
      }
    }
  };

  searchForUserByUserName = () => {
    const { firstName, lastName } = this.state;
    const {
      searchUserByNameFuncProp,
      getIndividualUserDataIndexPage,
      searchByLastNameFuncProp,
    } = this.props;

    if (firstName.length === 0 && lastName.length === 0) {
      this.setState({
        areYouSure: false,
        chosenArrayObjIndex: 0,
      });
      return null;
    }

    if (firstName.length === 0) {
      this.setState({
        areYouSure: false,
        chosenArrayObjIndex: 0,
      });
      return searchByLastNameFuncProp(lastName);
    }
    if (lastName.length === 0) {
      this.setState({
        areYouSure: false,
        chosenArrayObjIndex: 0,
      });
      return searchUserByNameFuncProp(firstName);
    }

    if (firstName.length > 0 && lastName.length > 0) {
      this.setState({
        areYouSure: false,
        chosenArrayObjIndex: 0,
      });
      return getIndividualUserDataIndexPage(firstName.concat(lastName));
    }

    this.setState({
      areYouSure: false,
      chosenArrayObjIndex: 0,
    });
  };

  routeToCreateEmployee = () => {
    const { history } = this.props;
    history.push("/create-employee");
    this.setState((state, props) => {
      return {
        areYouSure: false,
        chosenArrayObjIndex: 0,
      };
    });
  };

  routeToEditNotes = (userName) => {
    const { history, getIndividualUserDataIndexPage } = this.props;
    history.push("/edit-notes");
    getIndividualUserDataIndexPage(userName);
  };

  routeToCreateAdmin = () => {
    const { history } = this.props;
    history.push("/create-admin");
    this.setState((state, props) => {
      return {
        areYouSure: false,
        chosenArrayObjIndex: 0,
      };
    });
  };

  resetData = () => {
    const { getDataIndexPage } = this.props;
    getDataIndexPage();
    this.setState((state, props) => {
      return {
        firstName: "",
        lastName: "",
        areYouSure: false,
        chosenArrayObjIndex: 0,
      };
    });
  };

  clearMessages = () => {
    const { resetDeletedMessageFuncProp } = this.props;
    resetDeletedMessageFuncProp();
  };

  logOutUser = () => {
    const { history, resetAllDataFuncProp } = this.props;
    resetAllDataFuncProp();
    history.push("/");
    this.setState((state, props) => {
      return {
        areYouSure: false,
        chosenArrayObjIndex: 0,
      };
    });
  };

  deleteUser = (userName) => {
    this.props.deleteEmployeeFuncProp(userName);
    this.setState((state, props) => {
      return {
        firstName: "",
        lastName: "",
        areYouSure: false,
        chosenArrayObjIndex: 0,
      };
    });
  };

  areYouSureFunc = (val, agreement) => {
    if (agreement === true) {
      return this.setState((state, props) => {
        return { areYouSure: !state.areYouSure, chosenArrayObjIndex: val };
      });
    }

    if (agreement === false) {
      return this.setState((state, props) => {
        return { areYouSure: false, chosenArrayObjIndex: 0 };
      });
    }
  };

  render() {
    const { firstName, lastName, areYouSure, chosenArrayObjIndex } = this.state;
    const {
      loading,
      data,
      salariesTotal,
      getDataIndexPage,
      userName,
      changedColorProp,
      deletedEmployeeMessage,
      sprintOptions,
    } = this.props;

    if (loading === true) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            <img
              src={MicrosoftLogo}
              width={"50px"}
              height={"50px"}
              style={{
                justifySelf: "left",
              }}
            />
            <ChangeBackground stylesProp={{ justifySelf: "right" }} />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            <h3 style={{ justifySelf: "left", marginLeft: "1rem" }}>
              Welcome! Date of Login: {todayTime.toLocaleDateString()} <br></br>
            </h3>

            <h3
              style={{
                textAlign: "center",
                justifySelf: "right",
                marginRight: "1rem",
              }}
            >
              Logged In As: {userName.replace(/([a-z])([A-Z])/g, "$1 $2")}
            </h3>
          </div>

          <div
            className="flex-box-row"
            style={{
              margin: "10px",
              cursor: "pointer",
            }}
          >
            <button
              className={
                changedColorProp === true
                  ? "client-button-two"
                  : "client-button"
              }
              type="button"
              onClick={this.routeToCreateEmployee}
            >
              Create Employee
            </button>
            <button
              className={
                changedColorProp === true
                  ? "client-button-two"
                  : "client-button"
              }
              type="button"
              onClick={this.routeToCreateAdmin}
            >
              Create Admin
            </button>
            <button
              className={
                changedColorProp === true
                  ? "client-button-two"
                  : "client-button"
              }
              type="button"
              onClick={() => {
                getDataIndexPage();
                this.setState((state, props) => {
                  return {
                    areYouSure: false,
                    chosenArrayObjIndex: 0,
                  };
                });
              }}
            >
              Get Data
            </button>
            <button
              type="button"
              className={
                changedColorProp === true
                  ? "client-button-two"
                  : "client-button"
              }
              onClick={this.logOutUser}
            >
              Log Out
            </button>
          </div>

          <div className="flex-box-row" style={{ cursor: "pointer" }}>
            <button
              className={
                changedColorProp === true
                  ? "client-button-two"
                  : "client-button"
              }
              type="button"
              onClick={() => {
                this.props.sortByFirstNameFuncProp();
                this.setState((state, props) => {
                  return {
                    areYouSure: false,
                    chosenArrayObjIndex: 0,
                  };
                });
              }}
            >
              Sort By First Name
            </button>
            <button
              className={
                changedColorProp === true
                  ? "client-button-two"
                  : "client-button"
              }
              type="button"
              onClick={() => {
                this.props.sortByLastNameFuncProp();
                this.setState((state, props) => {
                  return {
                    areYouSure: false,
                    chosenArrayObjIndex: 0,
                  };
                });
              }}
            >
              Sort By Last Name
            </button>
            <button
              className={
                changedColorProp === true
                  ? "client-button-two"
                  : "client-button"
              }
              type="button"
              onClick={this.clearMessages}
            >
              Clear all messages
            </button>
          </div>

          <div>
            {deletedEmployeeMessage.length > 0 ? (
              <h3 className="deleted-employee-message">
                {deletedEmployeeMessage}
              </h3>
            ) : null}
          </div>

          <div className="flex-box-row">
            <input
              className="search-bar"
              placeholder="Enter first name"
              onChange={this.setInputValue}
              value={firstName}
              name="name"
            />
            <input
              className="search-bar"
              placeholder="Enter Last name"
              onChange={this.setInputValue}
              value={lastName}
              name="lastName"
            />
            <button
              className={
                changedColorProp === true
                  ? "client-button-two"
                  : "client-button"
              }
              type="button"
              onClick={this.searchForUserByUserName}
            >
              Search
            </button>
            <button
              className={
                changedColorProp === true
                  ? "client-button-two"
                  : "client-button"
              }
              type="button"
              onClick={this.resetData}
            >
              Reset
            </button>
          </div>

          <div
            style={{
              overflow: "hidden",
              overflowY: "scroll",
              overflowX: "scroll",
              height: "30rem",
            }}
          >
            <table className="table-data">
              <thead>
                <tr>
                  <th>Company Role</th>
                  <th>Name</th>
                  <th>Last Name</th>
                  <th>Personal Email</th>
                  <th>Personal Number</th>
                  <th>Company Email</th>
                  <th>Company Number</th>
                  <th>Slack ID</th>
                  <th>Notes</th>
                  <th>Status</th>
                  <th>
                    Salary <br></br> Salaries Total: {salariesTotal}
                  </th>
                  <th>Edit Notes</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((value, i) => {
                    return (
                      <tr
                        key={i}
                        className={
                          changedColorProp === true
                            ? "second-row-background"
                            : "first-row-background"
                        }
                      >
                        <td>{value.companyRole}</td>
                        <td>{value.name}</td>
                        <td>{addASpace(value.lastName)}</td>
                        <td>
                          <a href={`mailto:${value.personalEmail}`}>
                            {value.personalEmail}
                          </a>
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <a href={`tel:${value.phoneNumber}`}>
                            {value.phoneNumber}{" "}
                          </a>
                        </td>
                        <td>
                          {" "}
                          <a href={`mailto:${value.companyEmail}`}>
                            {value.companyEmail}
                          </a>
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <a href={`tel:${value.companyNumber}`}>
                            {value.companyNumber}
                          </a>
                        </td>
                        <td>{value.slackID}</td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {value.notes.length === 0
                            ? "No notes yet"
                            : value.notes}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {value.progress.length === 0
                            ? "You need to have a note to be able to select a status"
                            : value.progress}
                        </td>
                        <td>{value.salary}</td>
                        <td>
                          <button
                            type="button"
                            className="edit-button"
                            onClick={this.routeToEditNotes.bind(
                              this,
                              value.userName
                            )}
                          >
                            Edit Notes
                          </button>
                        </td>
                        <td>
                          {areYouSure === false ? (
                            <button
                              type="text"
                              className="delete-button"
                              onClick={this.areYouSureFunc.bind(this, i, true)}
                            >
                              Delete
                            </button>
                          ) : areYouSure === true &&
                            chosenArrayObjIndex === i ? (
                            <React.Fragment>
                              <button
                                className="delete-button"
                                type="button"
                                onClick={this.deleteUser.bind(
                                  this,
                                  value.userName
                                )}
                              >
                                Yes
                              </button>
                              <button
                                className={
                                  changedColorProp === true
                                    ? "client-button-two"
                                    : "client-button"
                                }
                                type="button"
                                onClick={this.areYouSureFunc.bind(
                                  this,
                                  i,
                                  false
                                )}
                              >
                                No
                              </button>
                            </React.Fragment>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No Data</td>
                    <td>No Data</td>
                    <td>No Data</td>
                    <td>No Data</td>
                    <td>No Data</td>
                    <td>No Data</td>
                    <td>No Data</td>
                    <td>No Data</td>
                    <td>No Data</td>
                    <td>No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.userReducer.data,
    userData: state.userReducer.userData,
    loading: state.userReducer.loading,
    loginSuccess: state.userReducer.loginSuccess,
    salariesTotal: state.userReducer.salariesTotal,
    userName: state.userReducer.userName,
    changedColorProp: state.userReducer.changedColor,
    deletedEmployeeMessage: state.userReducer.deletedEmployeeMessage,
    sprintOptions: state.userReducer.sprintOptions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDataIndexPage: bindActionCreators(getUsersDataRedux, dispatch),
    getIndividualUserDataIndexPage: bindActionCreators(
      getUserDataRedux,
      dispatch
    ),
    resetAllDataFuncProp: bindActionCreators(resetAllDataRedux, dispatch),
    deleteEmployeeFuncProp: bindActionCreators(deleteEmployeeRedux, dispatch),
    searchUserByNameFuncProp: bindActionCreators(
      searchUserByNameRedux,
      dispatch
    ),
    searchByLastNameFuncProp: bindActionCreators(
      searchByLastNameRedux,
      dispatch
    ),
    sortByFirstNameFuncProp: bindActionCreators(sortByFirstNameRedux, dispatch),
    sortByLastNameFuncProp: bindActionCreators(sortByLastNameRedux, dispatch),
    resetDeletedMessageFuncProp: () =>
      dispatch({ type: "RESET_DELETED_MESSAGE" }),
    getSprintOptionsFuncProp: bindActionCreators(
      getSprintOptionsRedux,
      dispatch
    ),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IndexPage)
);
