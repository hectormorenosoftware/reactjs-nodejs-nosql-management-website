import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loading from "../representational/Loading";
import {
  createEmployeeRedux,
  resetMessageRedux,
} from "../../redux/actions/userActions";
import {
  stringRegexPattern,
  phoneNumberRegexPattern,
  emailRegexPattern,
  slackRegexPattern,
  companyRoleRegexPattern,
  lastNameRegexPattern,
} from "../../utils";
import MicrosoftLogo from "../../images/microsoftlogo.png";

class CreateEmployeePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastName: "",
      personalEmail: "",
      phoneNumber: "",
      slackID: "",
      companyRole: "",
      isNameValid: true,
      isLastNameValid: true,
      isCompanyRoleValid: true,
      isSlackIDValid: true,
      isPersonalEmailValid: true,
      isPersonalNumberValid: true,
      formErrors: false,
    };
  }

  componentDidMount() {
    const { loginSuccess, history } = this.props;

    if (loginSuccess === false) {
      return history.push("/");
    }
  }

  setValue = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const isStringValid = stringRegexPattern.test(value);
      if (isStringValid) {
        return this.setState({
          name: value,
          isNameValid: true,
        });
      }
      if (isStringValid === false) {
        return this.setState({
          name: "",
          isNameValid: false,
        });
      }
    }

    if (name === "lastName") {
      const isStringValid = lastNameRegexPattern.test(value);
      if (isStringValid) {
        return this.setState({
          lastName: value,
          isLastNameValid: true,
        });
      }
      if (isStringValid === false) {
        return this.setState({
          lastName: "",
          isLastNameValid: false,
        });
      }
    }

    if (name === "companyRole") {
      const isStringValid = companyRoleRegexPattern.test(value);
      if (isStringValid) {
        return this.setState({
          companyRole: value,
          isCompanyRoleValid: true,
        });
      }
      if (isStringValid === false) {
        return this.setState({
          companyRole: "",
          isCompanyRoleValid: false,
        });
      }
    }

    if (name === "phoneNumber") {
      const isPhoneNumberValid = phoneNumberRegexPattern.test(value);

      if (isPhoneNumberValid) {
        return this.setState({
          [name]: value,
          isPersonalNumberValid: true,
        });
      }
      if (isPhoneNumberValid === false) {
        return this.setState({
          [name]: "",
          isPersonalNumberValid: false,
        });
      }
    }

    if (name === "personalEmail") {
      const isEmailValid = emailRegexPattern.test(value);

      if (isEmailValid) {
        return this.setState({
          [name]: value,
          isPersonalEmailValid: true,
          formErrors: false,
        });
      }
      if (isEmailValid === false) {
        return this.setState({
          [name]: value,
          isPersonalEmailValid: false,
        });
      }
    }

    if (name === "slackID") {
      const isSlackIDValid = slackRegexPattern.test(value);

      if (isSlackIDValid) {
        return this.setState({
          [name]: value,
          isSlackIDValid: true,
        });
      }
      if (isSlackIDValid === false) {
        return this.setState({
          [name]: "",
          isSlackIDValid: false,
        });
      }
    }

    return null;
  };

  goBackToEmployeesPage = () => {
    const { history, resetMessageFuncProp } = this.props;
    history.push("/employees");
    resetMessageFuncProp();
  };

  createEmployee = () => {
    const { createEmployeeFuncProp } = this.props;
    const { name, lastName, personalEmail, phoneNumber, slackID, companyRole } =
      this.state;

    const isPersonalEmailValid = emailRegexPattern.test(personalEmail);

    if (personalEmail.length >= 0) {
      if (isPersonalEmailValid === false) {
        this.setState({
          isPersonalEmailValid: false,
          formErrors: true,
        });
      }
    }

    if (
      name.length === 0 ||
      lastName.length === 0 ||
      personalEmail.length === 0 ||
      phoneNumber.length === 0 ||
      slackID.length === 0 ||
      companyRole.length === 0
    ) {
      return this.setState({
        formErrors: true,
      });
    }

    if (isPersonalEmailValid) {
      createEmployeeFuncProp(
        name,
        lastName.replace(/\s+/g, ""),
        name + lastName.replace(/\s+/g, ""),
        personalEmail,
        phoneNumber,
        slackID,
        companyRole,
        "",
        ""
      );
      this.setState({
        name: "",
        lastName: "",
        personalEmail: "",
        phoneNumber: "",
        slackID: "",
        companyRole: "",
        formErrors: false,
      });
    }
  };

  render() {
    const {
      name,
      lastName,
      personalEmail,
      phoneNumber,
      slackID,
      companyRole,
      isSlackIDValid,
      isNameValid,
      isLastNameValid,
      isCompanyRoleValid,
      isPersonalEmailValid,
      isPersonalNumberValid,
      formErrors,
    } = this.state;

    const { loading, createEmployeeMessage, changedColorProp } = this.props;

    if (loading === true) {
      return <Loading />;
    }

    return (
      <div className="flexbox-column">
        <img src={MicrosoftLogo} width={"50px"} height={"50px"} />
        <h1 id="align-text">Create Employee</h1>
        <h3 className="form-warning" id="align-text">
          {createEmployeeMessage.length > 0 ? createEmployeeMessage : ""}
        </h3>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={name}
        />
        {isNameValid === false ? (
          <p className="form-errors">
            Name can not contain numbers or special characters
          </p>
        ) : null}
        <input
          type="text"
          name="lastName"
          placeholder="Enter last name"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={lastName}
        />
        {isLastNameValid === false ? (
          <p className="form-errors">
            Last name can not contain numbers or special characters
          </p>
        ) : null}
        <input
          type="email"
          name="personalEmail"
          placeholder="Enter email"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={personalEmail}
        />
        {isPersonalEmailValid === false ? (
          <p className="form-errors">
            Email can not contain special characters
          </p>
        ) : null}

        <input
          type="text"
          name="phoneNumber"
          placeholder="Enter phone number"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={phoneNumber}
        />
        {isPersonalNumberValid === false ? (
          <p className="form-errors">
            Phone Number can not contain letters or special characters
          </p>
        ) : null}

        <input
          type="text"
          name="slackID"
          placeholder="Enter slackID"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={slackID}
        />
        {isSlackIDValid === false ? (
          <p className="form-errors">
            {" "}
            Slack ID can not contain letters, numbers, or special characters
          </p>
        ) : null}
        <input
          type="text"
          name="companyRole"
          placeholder="Enter job name"
          className="search-bar margin-create-employee-fields"
          onChange={this.setValue}
          value={companyRole}
        />
        {isCompanyRoleValid === false ? (
          <p className="form-errors">
            Job name can not contain numbers or special characters
          </p>
        ) : null}

        {formErrors ? (
          <p className="form-errors">
            This form has errors and can not be submitted
          </p>
        ) : null}
        <button
          className={`${
            changedColorProp === true ? "client-button-two" : "client-button"
          } margin-create-employee-fields`}
          type="button"
          onClick={this.createEmployee}
        >
          Create Employee
        </button>
        <button
          className={`${
            changedColorProp === true ? "client-button-two" : "client-button"
          } margin-create-employee-fields`}
          type="button"
          onClick={this.goBackToEmployeesPage}
        >
          Go Back
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.userReducer.loading,
    createEmployeeMessage: state.userReducer.createEmployeeMessage,
    loginSuccess: state.userReducer.loginSuccess,
    changedColorProp: state.userReducer.changedColor,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createEmployeeFuncProp: bindActionCreators(createEmployeeRedux, dispatch),
    resetMessageFuncProp: bindActionCreators(resetMessageRedux, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateEmployeePage)
);
