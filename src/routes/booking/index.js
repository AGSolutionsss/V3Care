import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Add from "./addBooking";
import Edit from "./editBooking";
import BookingUserList from "./bookingUserlist";
import BookingUserAdd from "./addBookingUser";
import BookingUserEdit from "./editBookingUser";
import View from "./viewBooking";
import confirmedBooking from "./confirmedBooking";
import vendorBooking from "./vendorBooking";
import completedBooking from "./completedBooking";
import BookingVendorList from "./bookingVendorlist";
import BookingVendorAdd from "./addBookingVendor";
import BookingVendorEdit from "./editBookingVendor";
import inspectionBooking from "./inspectionBooking";
import cancelBooking from "./cancelBookinglist";
import Reschedule from "./reschedule";
import Postpone from "./postpone";
import EditInspection from "./editBookingInspection";

const NewListBooking = ({ match }) => (
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
      <Route path={`${match.url}/editInspection`} component={EditInspection} />
      <Route path={`${match.url}/bookingUser`} component={BookingUserList} />
      <Route path={`${match.url}/addBookingUser`} component={BookingUserAdd} />
      <Route path={`${match.url}/editBookingUser`} component={BookingUserEdit} />
      <Route path={`${match.url}/view`} component={View} />
      <Route path={`${match.url}/bookingConfirmed`} component={confirmedBooking} />
      <Route path={`${match.url}/bookingVendor`} component={vendorBooking} />
      <Route path={`${match.url}/bookingCompleted`} component={completedBooking} />
      <Route path={`${match.url}/bookingVendors`} component={BookingVendorList} />
      <Route path={`${match.url}/addBookingVendor`} component={BookingVendorAdd} />
      <Route path={`${match.url}/editBookingVendor`} component={BookingVendorEdit} />
      <Route path={`${match.url}/bookingInspection`} component={inspectionBooking} />
      <Route path={`${match.url}/bookingCancel`} component={cancelBooking} />
      <Route path={`${match.url}/bookingReschedule`} component={Reschedule} />
      <Route path={`${match.url}/bookingPostpone`} component={Postpone} />
    </Switch>
  </div>
);

export default NewListBooking;