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

const View = (props) => {

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

    const createVendorNotification = (e) =>{
      e.preventDefault();
      let vendor_service = (booking.order_custom_price <= '1' ? booking.order_service : booking.order_custom);
      let order_ref = booking.order_ref;
      let area = booking.order_area;

      let data = {
        vendor_service: vendor_service,
        area: area,
        order_ref: order_ref,
      };
      axios({
        url: baseURL+"/panel-create-booking-vendor-notification",
        method: "POST",
        data,
        headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
        if(res.data.code == '200'){
            NotificationManager.success("Notification Sent Sucessfully");
            history.goBack();
        }else{
            NotificationManager.error("Enable to send Notification");
        }
        
    });
    };

    const sendWhatsApp = (e) =>{
      e.preventDefault();
      let data = {
        bookingId: id,
      };
      axios({
        url: baseURL+"/panel-send-booking-whatsapp",
        method: "POST",
        data,
        headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
        if(res.data.code == '200'){
            
            if(res.data.text.result == 'false'){
              NotificationManager.success(res.data.message);
              
            }else{
              NotificationManager.success("Message is Sent to WhatsApp");
              
            }
        }else{
            NotificationManager.error("Enable to send Notification");
        }
        
    });
    };
    useEscapeKey();
  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="View Booking" match={props.match} />
      <div className="donorbtns" style={{position:'relative',overflow:'hidden'}}>
       { !(booking.order_status === 'Pending' || 
    booking.order_status === 'Completed' || 
    booking.order_status === 'Cancel' || 
    booking.order_status === 'Vendor') && (
          <Link to={"bookingUser?id="+booking.id}>
            <Button
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                  
                  
                >
                  + Assign V3
                </Button>
                </Link>
       ) }
       { (booking.order_status === 'Confirmed' || 
    booking.order_status === 'Vendor') && (
        
                <Link to={"bookingVendors?id="+booking.id}>
                  <Button
                    className="mr-10 mb-10 btn-get-started"
                    color="danger"
                  >
                  + Assign Vendor
                </Button>
                </Link>
          )}
          {booking.order_status == 'Confirmed' &&
              <Button
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                  onClick={(e) => createVendorNotification(e)}
                >
                  + Notify All
                </Button>
        }
        
        </div>
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
                <label style={label}>Work Created By</label><br/>
                <span style={span}>{booking.created_by}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Work Confirmed By</label><br/>
                <span style={span}>{booking.updated_by}{" / "}{Moment(booking.updated_at).format('DD-MM-YYYY')}</span>
              </div>
            </div>
            {
              vendor.vendor_company &&
            
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Vendor</label><br/>
                    <span style={span}>{vendor.vendor_company}</span>
                </div>
            </div>
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
                    <h1 style={{fontSize:'18px'}}>Booking Assign</h1>&nbsp;&nbsp;&nbsp;
                    {/* <Button
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                  onClick={(e) => sendWhatsApp(e)}
                >
                  Send Whats App Message
                </Button> */}
                </div>
            </div>
           <div className="row" >
                <div className="col-md-12 col-12">
                {bookingAssign.length > 0 && (
                <table>
                    <tr style={labelBorder}>
                        <th style={labelTableSub}>
                            <span style={labelslabel}>Full Name</span>    
                        </th>    
                        <th style={labelTableSub}>
                            <span style={labelslabel}>Start Time</span>    
                        </th>
                        <th style={labelTableSub}>
                            <span style={labelslabel}>On the Way Time</span>    
                        </th>
                        <th style={labelTableSub}>
                            <span style={labelslabel}>End Time</span>    
                        </th>
                        <th style={labelTableSub}>
                            <span style={labelslabel}>Remarks</span>    
                        </th>
                        <th style={labelTableSub}>
                            <span style={labelslabel}>Status</span>    
                        </th>
                    </tr>
                    {bookingAssign.map((dataSumm, key)=>
                        <tr key={key} style={labelBorder}>
                            <th style={labelTableSub}>
                                <span style={labelslabelSpan}>
                                    {dataSumm.name}
                                </span>
                            </th>
                            <th style={labelTableSub}>
                                <span style={labelslabelSpan}>
                                    {dataSumm.order_start_time}
                                </span>
                            </th>
                            <th style={labelTableSub}>
                                <span style={labelslabelSpan}>
                                    {dataSumm.order_way_time}
                                </span>
                            </th>
                            <th style={labelTableSub}>
                                <span style={labelslabelSpan}>
                                    {dataSumm.order_end_time}
                                </span>
                            </th>
                            <th style={labelTableSub}>
                                <span style={labelslabelSpan}>
                                    {dataSumm.order_assign_remarks}
                                </span>
                            </th>
                            <th style={labelTableSub}>
                                <span style={labelslabelSpan}>
                                    {dataSumm.order_assign_status}
                                </span>
                            </th>
                        </tr>
                    )}
                    
                    </table>
                )}
                {bookingAssign.length <= 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <h1 style={{fontSize:'18px',textAlign:'center'}}>No Data Available</h1>
                    </div>
                )}
                </div>
           </div>

            
          
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default View;
