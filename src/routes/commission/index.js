import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./pendinglist";
import Received from "./receivedlist";
import ViewPending from "./ViewPending";
import ViewReceived from "./viewReceived";

const NewListCommission = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>V3Care</title>
      <meta name="description" content="V3Care" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/pending`} />
      <Route path={`${match.url}/pending`} component={Listing} />
      <Route path={`${match.url}/received`} component={Received} />
      <Route path={`${match.url}/viewPending`} component={ViewPending} />
      <Route path={`${match.url}/viewReceived`} component={ViewReceived} />
    </Switch>
  </div>
);

export default NewListCommission;