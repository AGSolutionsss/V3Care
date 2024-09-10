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

const status = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];

const EditVendor = (props) => {

    let history = useHistory();
    
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    const [vendor, setVendor] = useState({
        vendor_short: "",
        vendor_company: "",
        vendor_mobile: "",
        vendor_email: "",
        vendor_aadhar_no: "",
        vendor_gst_no: "",
        vendor_images: "",
        vendor_aadhar_front: "",
        vendor_aadhar_back: "",
        vendor_aadhar_gst: "",
        vendor_service_no_count: "",
        vendor_branch_no_count: "",
        vendor_area_no_count: "",
        vendor_service_data: "",
        vendor_branch_data: "",
        vendor_area_data: "",
        vendor_status: "",
        branch_id: "",
        vendor_ref_name_1: "",
        vendor_ref_name_2: "",
        vendor_ref_mobile_1: "",
        vendor_ref_mobile_2: "",
    });

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){
    
          window.location = "/signin";
          
        }else{
    
        }
        axios({
          url: baseURL+"/panel-fetch-vendor-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          setVendor(res.data.vendor);
          setUsers(res.data.vendorService);
          setUsers1(res.data.vendorbranch);
          setUsers2(res.data.vendorArea);
        });
      }, []);

    const [selectedFile1, setSelectedFile1] = React.useState(null);
    const [selectedFile2, setSelectedFile2] = React.useState(null);
    const [selectedFile3, setSelectedFile3] = React.useState(null);
    const [selectedFile4, setSelectedFile4] = React.useState(null);

    const useTemplate = {vendor_service:"",id:"",vendor_service_status:""};
    
    const [users, setUsers] = useState([useTemplate]);

    const onChange = (e, index) =>{
      const updatedUsers = users.map((user, i) => 
      index == i 
      ? Object.assign(user,{[e.target.name]: e.target.value}) 
      : user );
      setUsers(updatedUsers);
    };

    

    const useTemplate1 = {id:"",vendor_branch_flat:"",vendor_branch_building:"",vendor_branch_landmark:"",vendor_branch_pincode:"",vendor_branch_location:"",vendor_branch_city:"",vendor_branch_district:"",vendor_branch_state:"",vendor_branch_status:""};
    
    const [users1, setUsers1] = useState([useTemplate1]);

    
    
    const onChange1 = (e, index) =>{
      const updatedUsers = users1.map((user, i) => 
      index == i 
      ? Object.assign(user,{[e.target.name]: e.target.value}) 
      : user );
      setUsers1(updatedUsers);
    };

    const useTemplate2 = {id:"",vendor_area:"",vendor_area_status:""};
    
    const [users2, setUsers2] = useState([useTemplate2]);

    
    
    const onChange2 = (e, index) =>{
      const updatedUsers = users2.map((user, i) => 
      index == i 
      ? Object.assign(user,{[e.target.name]: e.target.value}) 
      : user );
      setUsers2(updatedUsers);
    };

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

      if(e.target.name=="vendor_mobile"){
        if(validateOnlyDigits(e.target.value)){
          setVendor({
            ...vendor,
            [e.target.name]: e.target.value,
          });
        }
      }else if(e.target.name=="vendor_ref_mobile_1"){
        if(validateOnlyDigits(e.target.value)){
          setVendor({
            ...vendor,
            [e.target.name]: e.target.value,
          });
        }
      }else if(e.target.name=="vendor_ref_mobile_2"){
        if(validateOnlyDigits(e.target.value)){
          setVendor({
            ...vendor,
            [e.target.name]: e.target.value,
          });
        }
      }else{
        setVendor({
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
  
  
      fetch(baseURL+'/panel-fetch-brancharea/'+vendor.branch_id, requestOptions)
      .then(response => response.json())
      .then(data => setArea(data.area)); 
    }, [vendor.branch_id]);

    const [servicess, setServicess] = useState([]);
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
  
  
      fetch(baseURL+'/panel-fetch-service', requestOptions)
      .then(response => response.json())
      .then(data => setServicess(data.service)); 
    }, []);

    const [state, setState] = useState([]);
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
  
  
      fetch(baseURL+'/panel-fetch-state', requestOptions)
      .then(response => response.json())
      .then(data => setState(data.state)); 
    }, []);

    useEscapeKey();

    const onSubmit = (e) => {
      e.preventDefault();
      let data={
        vendor_short: vendor.vendor_short,
        vendor_company: vendor.vendor_company,
        vendor_mobile: vendor.vendor_mobile,
        vendor_email: vendor.vendor_email,
        vendor_aadhar_no: vendor.vendor_aadhar_no,
        vendor_gst_no: vendor.vendor_gst_no,
        vendor_ref_name_1: vendor.vendor_ref_name_1,
        vendor_ref_mobile_1: vendor.vendor_ref_mobile_1,
        vendor_ref_name_2: vendor.vendor_ref_name_2,
        vendor_ref_mobile_2: vendor.vendor_ref_mobile_2,
      }
      
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-update-vendor-short/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Updated Sucessfully");
                history.push("listing");
            }else{
              if(res.data.code == '401'){
                NotificationManager.error("Company Short Duplicate Entry");
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
      <PageTitleBar title="Edit Vendor" match={props.match} />
      
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
            <h1>Personal Details</h1>
          <hr style={hr} />
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                        id="select-corrpreffer"
                        label="Nick Name"
                        name="vendor_short"
                        value={vendor.vendor_short}
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
                  label="Company"
                  autoComplete="Name"
                  name="vendor_company"
                  value={vendor.vendor_company}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  id="vendor_mobile"
                  label="Mobile No"
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  autoComplete="Name"
                  name="vendor_mobile"
                  
                  value={vendor.vendor_mobile}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  required
                  autoComplete="Name"
                  name="vendor_email"
                  value={vendor.vendor_email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                fullWidth
                  label="Aadhar No"
                  autoComplete="Name"
                  inputProps={{ maxLength: 12, minLength: 12 }}
                  required
                  name="vendor_aadhar_no"
                  value={vendor.vendor_aadhar_no}
                  onChange={(e) => onInputChange(e)}
                />
                 
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="GST No"
                  inputProps={{ maxLength: 15 }}
                  autoComplete="Name"
                  name="vendor_gst_no"
                  value={vendor.vendor_gst_no}
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
                        Update
                        </Button>
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
export default EditVendor;