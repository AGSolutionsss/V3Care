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
import MenuItem from "@material-ui/core/MenuItem";
import Moment from 'moment';
import map from "../../assets/logo/map.jpg";
import useEscapeKey from "../escape/useEscapeKey";

const status = [
    {
        value: "Pending",
        label: "Pending",
    },
    {
      value: "Inspection",
      label: "Inspection",
  },
    {
      value: "Confirmed",
      label: "Confirmed",
    },
    {
      value: "On the way",
      label: "On the way",
    },
    {
      value: "In Progress",
      label: "In Progress",
    },
    {
      value: "Completed",
      label: "Completed",
    },
    {
      value: "Vendor",
      label: "Vendor",
    },
    {
      value: "Cancel",
      label: "Cancel",
    },
];

const label = {
  color:'blueviolet',
  fontSize:'13px',
  marginBottom:'0px'
}

const span = {
  color:'black',
  fontSize:'16px'
}

const Reschedule = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;
    var d = document.getElementById("datefield");
    if (d) {
      document.getElementById("order_service_date").setAttribute("min", todayback);
    }

    const [booking, setBooking] = useState({
        
        order_service_date: "",
        order_year: "",
        order_time: "",
        order_comm: "",
        order_comment: "",
        
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }else{
          return false;
        }
      }

    const onInputChange = (e) => {
      if(e.target.name=="order_amount"){

        if(validateOnlyDigits(e.target.value)){
          setBooking({
            ...booking,
            [e.target.name]: e.target.value,
          });  
        }
      }else if(e.target.name=="order_payment_amount"){

        if(validateOnlyDigits(e.target.value)){
          setBooking({
            ...booking,
            [e.target.name]: e.target.value,
          });  
        }
      }else if(e.target.name=="order_comm"){

        if(validateOnlyDigits(e.target.value)){
          setBooking({
            ...booking,
            [e.target.name]: e.target.value,
          });  
        }
      }else{
        setBooking({
          ...booking,
          [e.target.name]: e.target.value,
        });  
      }
        
    };

    useEscapeKey();

    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      axios({
          url: baseURL+"/panel-fetch-booking-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setBooking(res.data.booking)
    
        });
      }, []);

      const [timeslot, setTimeSlot] = useState([]);
      useEffect(() => {
          fetch(baseURL+'/panel-fetch-timeslot-out')
          .then(response => response.json())
          .then(data => setTimeSlot(data.timeslot)); 
      }, []);

    const onSubmit = (e) => {
        let data = {
            
            order_service_date: booking.order_service_date,
            order_amount: booking.order_amount,
            order_time: booking.order_time,
            order_year: "2024-25",
            order_comm: booking.order_comm,
            order_comment: booking.order_comment,
            
        };
        
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-create-booking-reschedule/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Booking Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };


    const hr = {
        marginTop: "0rem",
    };

    

    const onMap = (e) =>{
      e.preventDefault();
      const mapurl = booking.order_url;
      window.open(mapurl, '_blank');
    }

    const [paymentmode, setPaymentMode] = useState([]);
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
  
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/panel-fetch-payment-mode', requestOptions)
      .then(response => response.json())
      .then(data => setPaymentMode(data.paymentMode)); 
    }, []);

    const [branch, setBranch] = useState([]);
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
  
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/panel-fetch-branch', requestOptions)
      .then(response => response.json())
      .then(data => setBranch(data.branch)); 
    }, []);

    const [area, setArea] = useState([]);
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
  
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/panel-fetch-brancharea/'+booking.branch_id, requestOptions)
      .then(response => response.json())
      .then(data => setArea(data.area)); 
    }, [booking.branch_id]);

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Resechedule Booking" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
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
          <div className="row">
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
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Current Price</label><br/>
                <span style={span}>{booking.order_service_price_for} - {booking.order_amount}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-2">
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
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="form-group">
                <label style={label}>Address</label><br/>
                <span style={span}>{booking.order_flat}, {booking.order_building}, {booking.order_landmark}, 
                 {booking.order_address}
                </span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <label style={label}>Remarks</label><br/>
                <span style={span}>{booking.order_remarks}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Work Created By</label><br/>
                <span style={span}>{booking.created_by}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Work Updated By</label><br/>
                <span style={span}>{booking.updated_by}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    id="order_service_date"
                    label="Service Date"
                    min={today}
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    autoComplete="Name"
                    name="order_service_date"
                    value={booking.order_service_date}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Time Slot"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="time"
                    autoComplete="Name"
                    name="order_time"
                    value={booking.order_time}
                    onChange={(e) => onInputChange(e)}
                    />
                  
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Commission"
                    autoComplete="Name"
                    name="order_comm"
                    value={booking.order_comm}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
          </div>
          <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Comment"
                    multiline
                    autoComplete="Name"
                    name="order_comment"
                    value={booking.order_comment}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="receiptbuttons" style={{textAlign:'center'}}>
                    <Button
                        type="submit"
                        className="mr-10 mb-10"
                        color="primary"
                        onClick={(e) => onSubmit(e)}
                        disabled={isButtonDisabled}
                    >
                        Submit
                    </Button>
                    
                </div>
            </div>
          </div>
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Reschedule;
