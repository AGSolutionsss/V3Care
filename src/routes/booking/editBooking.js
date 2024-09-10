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

const Edit = (props) => {

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

    useEscapeKey();

    const [booking, setBooking] = useState({
        order_status: "",
        order_service_date: "",
        order_amount: "",
        order_advance: "",
        order_time: "",
        order_comm: "",
        order_comment: "",
        order_payment_amount:"",
        order_payment_type: "",
        order_transaction_details: "",
        branch_id: localStorage.getItem('user_type_id') == '6' ? "" : localStorage.getItem('branch_id'),
        order_area: "",
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
      }else if(e.target.name=="order_advance"){

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
            order_advance: booking.order_advance,
            order_time: booking.order_time,
            order_status: booking.order_status,
            order_comm: booking.order_comm,
            order_comment: booking.order_comment,
            order_payment_amount: booking.order_payment_amount,
            order_payment_type: booking.order_payment_type,
            order_transaction_details: booking.order_transaction_details,
            branch_id: booking.branch_id,
            order_area: booking.order_area,
        };
        
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-update-booking/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Updated Sucessfully");
                history.goBack();
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

    const onSubmitNew = (e) => {
      let data = {
          
          order_service_date: booking.order_service_date,
          order_amount: booking.order_amount,
          order_advance: booking.order_advance,
          order_time: booking.order_time,
          order_status: booking.order_status,
          order_comm: booking.order_comm,
          order_comment: booking.order_comment,
          order_payment_amount: booking.order_payment_amount,
          order_payment_type: booking.order_payment_type,
          order_transaction_details: booking.order_transaction_details,
          branch_id: booking.branch_id,
            order_area: booking.order_area,
      };
      
      var url = new URL(window.location.href);
      var id = url.searchParams.get("id");

      var v = document.getElementById("addIndiv").checkValidity();
      var v = document.getElementById("addIndiv").reportValidity();
      e.preventDefault();

      if (v) {
      setIsButtonDisabled(true)
      axios({
          url: baseURL+"/panel-update-booking/"+id,
          method: "PUT",
          data,
          headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
      }).then((res) => {
          if(res.data.code == '200'){
            if(res.data.text.result == 'false'){
              NotificationManager.success(res.data.message);
              history.goBack();
            }else{
              NotificationManager.success("Data Updated Sucessfully & Sent Message");
              history.goBack();
            }
              
              
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
      <PageTitleBar title="Edit Booking" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
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
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  required
                  select
                  label="Status"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="order_status"
                  value={booking.order_status}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    id="order_service_date"
                    label="Service Date"
                    min={today}
                    type="date"
                    disabled
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
            <div className="col-sm-12 col-md-12 col-xl-3">
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
            <div className="col-sm-12 col-md-12 col-xl-3">
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
          <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Amount"
                    autoComplete="Name"
                    name="order_amount"
                    value={booking.order_amount}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    
                    label="Advance"
                    autoComplete="Name"
                    name="order_advance"
                    value={booking.order_advance}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
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
          {/* {localStorage.getItem('user_type_id') == '6' ?
            <div className="col-sm-12 col-md-12 col-xl-3">
            <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Branch"
                  autoComplete="Name"
                  name="branch_id"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={booking.branch_id}
                  onChange={(e) => onInputChange(e)}
                >
                  {branch.map((branchdata, key) => (
                      <MenuItem key={key} value={branchdata.id}>
                          {branchdata.branch_name}
                      </MenuItem>
                  ))}
                </TextField>
          </div>
          </div>
           : ""} */}
           {/* <div className="col-sm-12 col-md-12 col-xl-3">
            <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Area"
                  autoComplete="Name"
                  name="order_area"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={booking.order_area}
                  onChange={(e) => onInputChange(e)}
                >
                  {area.map((areadata, key) => (
                                    <MenuItem key={key} value={areadata.area}>
                                        {areadata.area}
                                    </MenuItem>
                                ))}
                </TextField>
          </div>
          </div> */}
          
          
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Paid Amount"
                    autoComplete="Name"
                    name="order_payment_amount"
                    value={booking.order_payment_amount}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                
                    <TextField
                    fullWidth
                    select
                    SelectProps={{
                      MenuProps: {},
                    }}
                    label="Payment Mode"
                    autoComplete="Name"
                    name="order_payment_type"
                    value={booking.order_payment_type}
                    onChange={(e) => onInputChange(e)}
                    >
                  {paymentmode.map((option) => (
                    <MenuItem key={option.payment_mode} value={option.payment_mode}>
                      {option.payment_mode}
                    </MenuItem>
                  ))}
                </TextField>
                </div>
            </div>
            </div>
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Transaction Details"
                    autoComplete="Name"
                    name="order_transaction_details"
                    value={booking.order_transaction_details}
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
                        Update
                    </Button>
                    <Link to={'bookingReschedule?id='+id}>
                    <Button
                        type="submit"
                        className="mr-10 mb-10"
                        color="primary"
                      
                    >
                        Work in Progress
                    </Button>
                    </Link>
                    <Link to={'bookingPostpone?id='+id}>
                    <Button
                        type="submit"
                        className="mr-10 mb-10"
                        color="primary"
                      
                    >
                        Postpone
                    </Button>
                    </Link>
                    
                </div>
            </div>
          </div>
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Edit;
