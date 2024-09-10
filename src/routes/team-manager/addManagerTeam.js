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
import useEscapeKey from "../escape/useEscapeKey";

const userType = [
  {
    value: "1",
    label: "Action Team",
  },
  {
    value: "7",
    label: "Office Staff",
  },
];

const userType1 = [
  {
    value: "1",
    label: "Action Team",
  },
  {
    value: "5",
    label: "Manager",
  },
  {
    value: "7",
    label: "Office Staff",
  },
];

const Add = (props) => {

    let history = useHistory();
    const [team, setTeam] = useState({
        name: "",
        mobile: "",
        email: "",
        remarks: "",
        branch_id: "",
        user_type: "5",
        user_aadhar_no: "",
        user_aadhar: "",
        user_pancard_no: "",
        user_pancard: "",
    });

    const [selectedFile1, setSelectedFile1] = React.useState(null);
    const [selectedFile2, setSelectedFile2] = React.useState(null);

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    
    const validateOnlyDigits = (inputtxt) => {
      var phoneno = /^\d+$/;
      if(inputtxt.match(phoneno) || inputtxt.length==0){
        return true;
      }else{
        return false;
      }
    }

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

    const onInputChange = (e) => {
      if(e.target.name=="mobile"){
        if(validateOnlyDigits(e.target.value)){
          setTeam({
            ...team,
            [e.target.name]: e.target.value,
          });  
        }
      }else if(e.target.name=="user_aadhar_no"){
        if(validateOnlyDigits(e.target.value)){
          setTeam({
            ...team,
            [e.target.name]: e.target.value,
          });  
        }
      }else{
        setTeam({
          ...team,
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
        
    });

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("name",team.name);
        data.append("mobile",team.mobile);
        data.append("email",team.email);
        data.append("remarks",team.remarks);
        data.append("branch_id",team.branch_id);
        data.append("user_type",team.user_type);
        data.append("user_aadhar_no",team.user_aadhar_no);
        data.append("user_aadhar",selectedFile1);
        data.append("user_pancard_no",team.user_pancard_no);
        data.append("user_pancard",selectedFile2);
        
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-create-admin-user",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Inserted Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Backhand Team" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Full Name"
                  autoComplete="Name"
                  name="name"
                  value={team.name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Mobile No"
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  autoComplete="Name"
                  name="mobile"
                  value={team.mobile}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Email Id"
                  type="email"
                  autoComplete="Name"
                  name="email"
                  value={team.email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
           <div className="col-sm-12 col-md-12 col-xl-4">
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
                  value={team.branch_id}
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
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="Aadhar No"
                  inputProps={{ maxLength: 12}}
                  autoComplete="Name"
                  name="user_aadhar_no"
                  value={team.user_aadhar_no}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                  <TextField
                    fullWidth
                    type="file"
                    label="Aadhar Photo"
                    InputLabelProps={{ shrink: true }}
                    autoComplete="Name"
                    name="user_aadhar"
                    onChange={(e) => setSelectedFile1(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  
                  label="Pancard No"
                  inputProps={{ maxLength: 10 }}
                  autoComplete="Name"
                  name="user_pancard_no"
                  value={team.user_pancard_no}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                  <TextField
                    fullWidth
                    type="file"
                    
                    label="Pancard Photo"
                    InputLabelProps={{ shrink: true }}
                    autoComplete="Name"
                    name="user_pancard"
                    onChange={(e) => setSelectedFile2(e.target.files[0])}
                  />
                </div>
              </div>
            <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="Remarks"
                  autoComplete="Name"
                  name="remarks"
                  value={team.remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
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

export default Add;
