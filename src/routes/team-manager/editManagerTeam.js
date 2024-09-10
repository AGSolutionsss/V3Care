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

const status = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
  ];

const Edit = (props) => {

    let history = useHistory();
    const [team, setTeam] = useState({
        name: "",
        mobile: "",
        email: "",
        remarks: "",
        status: "",
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

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

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
            
            setTeam(res.data.adminUser)
      
          });
        }, []);

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("name",team.name);
        data.append("mobile",team.mobile);
        data.append("email",team.email);
        data.append("remarks",team.remarks);
        data.append("status",team.status);
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
            url: baseURL+"/panel-update-admin-user/"+id+'?_method=PUT',
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };
    useEscapeKey();
  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Backhand Team" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-4">
                <div className="form-group">
                <TextField
                  fullWidth
                  required
                  disabled
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
                  autoComplete="Name"
                  inputProps={{ maxLength: 10, minLength: 10 }}
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
            <div className="col-sm-12 col-md-12 col-xl-3">
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
            <div className="col-sm-12 col-md-12 col-xl-3">
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
                  <small>{team.user_aadhar}</small>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-3">
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
            <div className="col-sm-12 col-md-12 col-xl-3">
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
                  <small>{team.user_pancard}</small>
                </div>
              </div>
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
                  name="status"
                  value={team.status}
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
            <div className="col-sm-12 col-md-12 col-xl-9">
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

export default Edit;
