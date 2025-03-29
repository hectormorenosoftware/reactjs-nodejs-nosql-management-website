import React from "react";
import { Switch, withRouter, Route, Redirect } from "react-router-dom";

import IndexPage from "./components/pages/IndexPage";
import LoginPage from "./components/pages/LoginPage";
import AdminPage from "./components/pages/AdminPage";
import CreateEmployeePage from "./components/pages/CreateEmployeePage";
import EditNotes from "./components/pages/EditNotes";
import SprintOptions from "./components/pages/SprintOptions";

class App extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/sprint-options"
          render={() => <SprintOptions />}
        ></Route>
        <Route exact path="/edit-notes" render={() => <EditNotes />}></Route>
        <Route
          exact
          path="/create-employee"
          render={() => <CreateEmployeePage />}
        />

        <Route exact path="/create-admin" render={() => <AdminPage />} />
        <Route exact path="/employees" render={() => <IndexPage />} />
        <Route exact path="/" render={() => <LoginPage />} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default withRouter(App);
