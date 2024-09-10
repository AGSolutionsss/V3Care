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
    const [referby, setReferBy] = useState({
        refer_by: "",
        refer_by_status: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const validateOnlyText = (inputtxt) => {

      var re = /^[A-Za-z ]+$/;
      if(inputtxt === "" || re.test(inputtxt)){
        return true;
      }else{
        return false;
      }
    }


    const onInputChange = (e) => {
        setReferBy({
          ...referby,
          [e.target.name]: e.target.value,
        });  
      
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
            url: baseURL+"/panel-fetch-referby-by-id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setReferBy(res.data.referby)
      
          });
        }, []);

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("refer_by",referby.refer_by);
        data.append("refer_by_status",referby.refer_by_status);

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-update-referby/"+id+'?_method=PUT',
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
      <PageTitleBar title="Edit Refer By" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            
              <div className="col-sm-6 col-md-6 col-xl-6">
                <div className="form-group">
                  <TextField
                    fullWidth
                    required
                    disabled
                    label="Refer By"
                    autoComplete="Name"
                    name="refer_by"
                    value={referby.refer_by}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  required
                  select
                  label="Status"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="refer_by_status"
                  value={referby.refer_by_status}
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
