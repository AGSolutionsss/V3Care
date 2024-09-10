import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Add from "./addReferBy";
import Edit from "./editReferBy";

const NewListReferBy = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>V3Care</title>
      <meta name="description" content="V3Care" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/add`} component={Add} />
      <Route path={`${match.url}/edit`} component={Edit} />
    </Switch>
  </div>
);

export default NewListReferBy;