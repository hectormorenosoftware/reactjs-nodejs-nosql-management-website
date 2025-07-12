import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChangeBackground from "../representational/ChangeBackground";
import Loading from "../representational/Loading";
import { loginRedux } from "../../redux/actions/userActions";
import { stringRegexPattern, passwordRegexPattern } from "../../utils";
import MicrosoftLogo from "../../images/microsoftlogo.png";

class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      displayPassword: false,
      isUserNameValid: true,
      isPasswordValid: true,
      formErrors: false,
    };
  }

  componentDidUpdate() {
    const { loginSuccess, history } = this.props;
    if (loginSuccess === true) {
      history.push("/employees");
    }
  }

  setInputValue = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      const isUserNameValid = stringRegexPattern.test(value);
      if (isUserNameValid) {
        return this.setState({
          userName: value,
          isUserNameValid: true,
          formErrors: false,
        });
      }
      if (isUserNameValid === false) {
        return this.setState({
          userName: "",
          isUserNameValid: false,
        });
      }
    }
    if (name === "password") {
      const isPasswordValid = passwordRegexPattern.test(value);
      if (isPasswordValid) {
        return this.setState({
          password: value,
          isPasswordValid: true,
          formErrors: false,
        });
      }
      if (isPasswordValid === false) {
        return this.setState({
          password: "",
          isPasswordValid: false,
        });
      }
    }
  };

  showPassword = () => {
    const { displayPassword } = this.state;
    this.setState({
      displayPassword: !displayPassword,
    });
  };

  loginFunc = () => {
    const { userName, password } = this.state;

    if (userName.length === 0 || password.length === 0) {
      return this.setState({
        formErrors: true,
      });
    }

    if (userName.length > 0 && password.length > 0) {
      return this.props.loginToAccounts(userName, password);
    }
  };

  render() {
    const {
      userName,
      password,
      displayPassword,
      isUserNameValid,
      isPasswordValid,
      formErrors,
    } = this.state;
    const { loading, errorMessage, changedColorProp } = this.props;

    if (loading === true) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <ChangeBackground stylesProps={null} />
        </div>
        <div className="flexbox-column">
          <img src={MicrosoftLogo} width={"50px"} height={"50px"} />
          <h1 id="align-text">Project Management Tools</h1>
        </div>

        <div className="flexbox-column">
          <input
            className="search-bar margin-create-employee-fields"
            id="width-login-username"
            type="text"
            name="username"
            onChange={this.setInputValue}
            placeholder="Enter your username"
            value={userName}
          />
          {isUserNameValid === false ? (
            <p className="form-errors">
              Username can not contain numbers or special characters
            </p>
          ) : null}
          <input
            className="search-bar margin-create-employee-fields"
            id="width-login-password"
            type={displayPassword ? "text" : "password"}
            name="password"
            onChange={this.setInputValue}
            placeholder="Enter your password"
            value={password}
          />
          {isPasswordValid === false ? (
            <p className="form-errors">
              Password can not contain special characters
            </p>
          ) : null}
          {formErrors ? (
            <p className="form-errors">
              You need a username and password to log in
            </p>
          ) : null}
          {errorMessage.length > 0 ? (
            <p className="form-errors">{errorMessage}</p>
          ) : null}
          <div className="flexbox-column">
            <button
              className={`${
                changedColorProp === true
                  ? "client-button-two"
                  : "client-button"
              } margin-create-employee-fields`}
              type="button"
              onClick={this.showPassword}
            >
              {displayPassword ? "Hide Password" : "Show Password"}
            </button>
            <button
              className={`${
                changedColorProp === true
                  ? "client-button-two"
                  : "client-button"
              } margin-create-employee-fields`}
              type="button"
              onClick={this.loginFunc}
            >
              Login
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.userReducer.loading,
    loginSuccess: state.userReducer.loginSuccess,
    errorMessage: state.userReducer.errorMessage,
    changedColorProp: state.userReducer.changedColor,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginToAccounts: bindActionCreators(loginRedux, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
