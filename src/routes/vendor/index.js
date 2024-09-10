import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Add from "./addVendor";
import Edit from "./editVendor";
import View from "./viewVendor";
import VendorUserList from "./vendorUserlist";
import VendorUserAdd from "./addVendorUser";
import VendorUserEdit from "./editVendorUser";
import VendorService from "./addVendorService";
import EditVendor from "./edit";

const NewListVendor = ({ match }) => (
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
      <Route path={`${match.url}/view`} component={View} />
      <Route path={`${match.url}/vendorUser`} component={VendorUserList} />
      <Route path={`${match.url}/addVendorUser`} component={VendorUserAdd} />
      <Route path={`${match.url}/editVendorUser`} component={VendorUserEdit} />
      <Route path={`${match.url}/addVendorService`} component={VendorService} />
      <Route path={`${match.url}/editVendor`} component={EditVendor} />
    </Switch>
  </div>
);

export default NewListVendor;