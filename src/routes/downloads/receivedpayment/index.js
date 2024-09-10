import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import Moment from 'moment';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import {baseURL} from '../../../api';

const status = [
    {
        value: "Pending",
        label: "Pending",
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

const ReceivedPaymentDownload = (props) => {
  let history = useHistory();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var midate = "04/04/2022"
  var todayback = yyyy + "-" + mm + "-" + dd;

  const firstdate = Moment().startOf('month').format('YYYY-MM-DD');

  const [downloadReceivedPayment, setReceivedPaymentDownload] = useState({
    booking_date_from: firstdate,
    booking_date_to: todayback,
  });

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

   useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
      
    });
    
  const onInputChange = (e) => {
   setReceivedPaymentDownload({
      ...downloadReceivedPayment,
      [e.target.name]: e.target.value,
    });
  
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
        booking_date_from: downloadReceivedPayment.booking_date_from,
        booking_date_to: downloadReceivedPayment.booking_date_to,
    };
    var v = document.getElementById('dowRecp').checkValidity();
    var v = document.getElementById('dowRecp').reportValidity();
    e.preventDefault();
    console.log("Data : ",data);
if(v){
  setIsButtonDisabled(true)
    axios({
      url: baseURL+"/panel-download-received-payment",
      method: "POST",
      data,
     headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
     const url = window.URL.createObjectURL(new Blob([res.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', 'receivedpayment_list.csv'); 
     document.body.appendChild(link);
     link.click();
      NotificationManager.success("Received Payment is Downloaded Successfully");
        setIsButtonDisabled(false)
      //history.push('listing');
    }).catch((err) =>{
     NotificationManager.error("Received Payment is Not Downloaded");
     setIsButtonDisabled(false)
   });
  }
  };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Download Received Payment" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
          <h3 style={{color: 'red'}}>Leave blank if you want all records.</h3>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="From Date"
                  required
                  type="date"
                  autoComplete="Name"
                  name="booking_date_from"
                  InputLabelProps={{ shrink: true }}
                  value={downloadReceivedPayment.booking_date_from}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="To Date"
                  type="date"
                  required
                  autoComplete="Name"
                  name="booking_date_to"
                  InputLabelProps={{ shrink: true }}
                  value={downloadReceivedPayment.booking_date_to}
                  onChange={(e) => onInputChange(e)}
                />
              
              </div>
            </div>
            
            <div className="col-sm-6 col-md-6 col-xl-4">
            <Button
              className="mr-10 mb-10"
              color="primary"
              type="submit"
              style={{ width: "100%" }}
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Download
            </Button>
          </div>
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default ReceivedPaymentDownload;
