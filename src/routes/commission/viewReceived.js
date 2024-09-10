import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';
import Moment from 'moment';
import map from "../../assets/logo/map.jpg"
import useEscapeKey from "../escape/useEscapeKey";

const labelslabelSpan = {
    fontWeight: '500',
    fontSize: '16px',
    paddingTop:'5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
}

const label = {
  color:'blueviolet',
  fontSize:'13px',
  marginBottom:'0px'
}

const span = {
  color:'black',
  fontSize:'16px'
}

const card = {
  borderBottom: '2px solid #d2a7a7'
}

const cardT = {
  paddingTop:'20px',
  borderBottom: '2px solid #d2a7a7'
}

const labelslabel = {
    
    fontSize: '16px',
    fontWeight: '400',
    paddingTop:'5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    height: '30px !important',
    margin: '0px !important',
    color: "rgb(0, 0, 0)",
};

const labelTableSub = {
    width:'25%',
    border: '1px solid black',
}

const labelBorder = {
    paddingTop:'5px',
    border:'1px solid #4d4b4b',
}

const ViewReceived = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    const [booking, setBooking] = useState({});
    const [bookingAssign, setBookingAssign] = useState({});
    const [vendor, setVendor] = useState({});
    
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      axios({
          url: baseURL+"/panel-fetch-booking-view-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setBooking(res.data.booking);
          setBookingAssign(res.data.bookingAssign);
          setVendor(res.data.vendor);
          
        });
      }, []);

    const hr = {
        marginTop: "0rem",
    };

    const onMap = (e) =>{
      e.preventDefault();
      const mapurl = booking.order_url;
      window.open(mapurl, '_blank');
    }

    const updateData = (e) => {
        e.preventDefault();
        var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
        axios({
          url: baseURL+"/panel-update-comm-status/"+id,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
           NotificationManager.success("Data Update Sucessfully");
           history.push("received");
        })
      };
      useEscapeKey();
  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="View Received Commission" match={props.match} />
      <RctCollapsibleCard style={card}>
        <form id="addIndiv" autoComplete="off">
          <div className="row" style={cardT}>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Booking Id</label><br/>
                <span style={span}>{booking.order_ref} ( {booking.order_status} )</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Customer</label><br/>
                <span style={span}>{booking.order_customer}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Mobile</label><br/>
                <span style={span}>{booking.order_customer_mobile}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Email</label><br/>
                <span style={span}>{booking.order_customer_email}</span>
              </div>
            </div>
          </div>
          <div className="row" style={cardT}>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Booking Date</label><br/>
                <span style={span}>{Moment(booking.order_date).format('DD-MM-YYYY')}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Service Date / Slot Time</label><br/>
                <span style={span}>{Moment(booking.order_service_date).format('DD-MM-YYYY')} - {booking.order_time}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Service</label><br/>
                <span style={span}>{(booking.order_custom_price <= '1' ? booking.order_service : booking.order_custom)}
                {(booking.order_custom_price <= '1' ? ' - '+booking.order_service_sub : '')}
                </span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Booked Price</label><br/>
                <span style={span}>{booking.order_service_price_for} - {(booking.order_custom_price <= '1' ? booking.order_service_price : booking.order_custom_price)}</span>
              </div>
            </div>
          </div>
          <div className="row" style={cardT}>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Current Price</label><br/>
                <span style={span}>{booking.order_service_price_for} - {booking.order_amount}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-1">
              <div className="form-group">
                <label style={label}>Advance</label><br/>
                <span style={span}>{booking.order_advance}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-1">
              <div className="form-group">
                <label style={label}>KM</label><br/>
                <span style={span}>{booking.order_km}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <img src={map} alt="map" style={{width:'65px',cursor:'pointer'}} onClick={(e) => onMap(e)}/>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-2">
              <div className="form-group">
                <label style={label}>Branch</label><br/>
                <span style={span}>{booking.branch_name}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-2">
              <div className="form-group">
                <label style={label}>Area</label><br/>
                <span style={span}>{booking.order_area}</span>
              </div>
            </div>
            
          </div>
          <div className="row" style={cardT}>
              
              
            <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="form-group">
                <label style={label}>Address</label><br/>
                <span style={span}>{booking.order_flat}, {booking.order_building}, {booking.order_landmark}, 
                {booking.order_address}
                </span>
              </div>
            </div>
            
          </div>
          <div className="row" style={cardT}>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <label style={label}>Remarks</label><br/>
                <span style={span}>{booking.order_remarks}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <label style={label}>Comment</label><br/>
                    <span style={span}>{booking.order_comment}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <label style={label}>Postpone Reason</label><br/>
                    <span style={span}>{booking.order_postpone_reason}</span>
                </div>
            </div>
            </div>
          <div className="row" style={cardT}>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Booking Created By</label><br/>
                <span style={span}>{booking.created_by}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Booking Confirmed By</label><br/>
                <span style={span}>{booking.updated_by}{" / "}{Moment(booking.updated_at).format('DD-MM-YYYY')}</span>
              </div>
            </div>
            {
              vendor.vendor_company &&
            <>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Vendor</label><br/>
                    <span style={span}>{vendor.vendor_company}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
            <div className="form-group">
                <label style={label}>Commission</label><br/>
                <span style={span}>{booking.order_comm}</span>
            </div>
        </div></>
            }
          </div>
          <div className="d-flex pl-30" style={{justifyContent:'center',paddingTop:'20px'}}>
                <div className="address text-center">
                    <h1 style={{fontSize:'18px'}}>Payment</h1>
                </div>
            </div>
            <div className="row mt-4" style={cardT}>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <label style={label}>Payment Amount</label><br/>
                        <span style={span}>{booking.order_payment_amount}</span>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <label style={label}>Payment Type</label><br/>
                        <span style={span}>{booking.order_payment_type}</span>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-6">
                    <div className="form-group">
                        <label style={label}>Transaction Details</label><br/>
                        <span style={span}>{booking.order_transaction_details}</span>
                    </div>
                </div>
            </div>
           <div className="d-flex pl-30 mt-4" style={{justifyContent:'center'}}>
                <div className="address " style={{display:'flex'}}>
                    <Button
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                  onClick={(e) => updateData(e)}
                >
                  Did not Received Commission
                </Button>
                </div>
            </div>
           

            
          
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default ViewReceived;
