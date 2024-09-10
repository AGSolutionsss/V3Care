import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./pendinglist";
import Received from "./receivedlist";
import ViewReceived from "./viewReceived";
import ViewPending from "./viewPending";

const NewListPayment = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>V3Care</title>
      <meta name="description" content="V3Care" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/pending`} />
      <Route path={`${match.url}/pending`} component={Listing} />
      <Route path={`${match.url}/received`} component={Received} />
      <Route path={`${match.url}/viewReceived`} component={ViewReceived} />
      <Route path={`${match.url}/viewPending`} component={ViewPending} />
    </Switch>
  </div>
);

export default NewListPayment;