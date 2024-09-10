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

    const [user, setUser] = useState({});
    
    
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      axios({
          url: baseURL+"/panel-fetch-admin-user-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setUser(res.data.adminUser);
          
        });
      }, []);

    const hr = {
        marginTop: "0rem",
    };

    

    useEscapeKey();

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="View Field Team" match={props.match} />
      <div className="donorbtns" style={{position:'relative',overflow:'hidden'}}>
      < a target="_blank" href={"https://agsdraft.online/app/storage/app/public/user_document/"+user.user_aadhar} download>Download Aadhar </a>&nbsp;&nbsp;&nbsp;
      < a target="_blank" href={"https://agsdraft.online/app/storage/app/public/user_document/"+user.user_pancard} download>Download Pancard </a>
      </div>
      <RctCollapsibleCard style={card}>
        <form id="addIndiv" autoComplete="off">
          <div className="row" style={cardT}>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Full Name</label><br/>
                <span style={span}>{user.name} ( {user.status} )</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Mobile No</label><br/>
                <span style={span}>{user.mobile}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Email Id</label><br/>
                <span style={span}>{user.email}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Aadhar No</label><br/>
                <span style={span}>{user.user_aadhar_no}</span>
              </div>
            </div>
          </div>
          <div className="row" style={cardT}>
          <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Pancard No</label><br/>
                <span style={span}>{user.user_pancard_no}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-9">
              <div className="form-group">
                <label style={label}>Remarks</label><br/>
                <span style={span}>{user.remarks}</span>
              </div>
            </div>
            
          </div>

            
          <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="receiptbuttons" style={{textAlign:'center'}}>
                    <Link to="listing">
                        <Button className="mr-10 mb-10" color="success">
                            Back
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

export default View;
