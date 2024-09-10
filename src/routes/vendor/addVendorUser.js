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
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useEscapeKey from "../escape/useEscapeKey";

const VendorUserAdd = (props) => {

    let history = useHistory();

    var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

    const [vendor, setVendorUser] = useState({
        name: "",
        mobile: "",
        email: "",
        vendor_id: id,
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

      if(e.target.name=="mobile"){
        if(validateOnlyDigits(e.target.value)){
          setVendorUser({
            ...vendor,
            [e.target.name]: e.target.value,
          });
        }
      }else{
        setVendorUser({
        ...vendor,
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
        
    });

    

    useEscapeKey();

    const onSubmit = (e) => {
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

      let data = {
        name : vendor.name,
        mobile : vendor.mobile,
        email : vendor.email,
        vendor_id : id,
      };
      
       

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true);
        axios({
            url: baseURL+"/panel-create-vendor-user",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Inserted Sucessfully");
                history.push("vendorUser?id="+id);
            }else{
              if(res.data.code == '401'){
                NotificationManager.error("Full Name Duplicate Entry");
                setIsButtonDisabled(true);
              }else if(res.data.code == '402'){
                NotificationManager.error("Mobile No Duplicate Entry");
                setIsButtonDisabled(true);
              }else{
                NotificationManager.error("Email Id Duplicate Entry");
                setIsButtonDisabled(true);
              }
                
            }
            
        });
        }
    };

    const hr = {
        marginTop: "0rem",
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Vendor User" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
            
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                        id="select-corrpreffer"
                        required
                        label="Full Name"
                        name="name"
                        value={vendor.name}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                        />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  id="mobile"
                  label="Mobile No"
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  autoComplete="Name"
                  name="mobile"
                  
                  value={vendor.mobile}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  required
                  autoComplete="Name"
                  name="email"
                  value={vendor.email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
            
           <div className="row mt-4">
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
export default VendorUserAdd;