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
    const [services, setService] = useState({
        service_id: "",
        service_sub_id: "",
        service_price_for: "",
        service_price_rate: "",
        service_price_amount: "",
        service_price_status: "",
    });
    useEscapeKey();
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
      if(e.target.name=="service_price_rate"){
        if(validateOnlyDigits(e.target.value)){
          setService({
            ...services,
            [e.target.name]: e.target.value,
          });
        }
      }else if(e.target.name=="service_price_amount"){
        if(validateOnlyDigits(e.target.value)){
          setService({
            ...services,
            [e.target.name]: e.target.value,
          });
        }
      }else{
        setService({
          ...services,
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
            url: baseURL+"/panel-fetch-service-price-by-id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setService(res.data.serviceprice)
      
          });
        }, []);

        const [serdata, setSerData] = useState([]);
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
                     'Authorization': 'Bearer '+theLoginToken
                  }             
            };     
      
      
          fetch(baseURL+'/panel-fetch-service', requestOptions)
          .then(response => response.json())
          .then(data => setSerData(data.service)); 
        }, []);

        const [serdatasub, setSerDataSub] = useState([]);
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
                     'Authorization': 'Bearer '+theLoginToken
                  }             
            };     
      
      
          fetch(baseURL+'/panel-fetch-service-sub/'+services.service_id, requestOptions)
          .then(response => response.json())
          .then(data => setSerDataSub(data.servicesub)); 
        }, [services.service_id]);

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("service_id",services.service_id);
        data.append("service_sub_id",services.service_sub_id);
        data.append("service_price_for",services.service_price_for);
        data.append("service_price_rate",services.service_price_rate);
        data.append("service_price_amount",services.service_price_amount);
        data.append("service_price_status",services.service_price_status);

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-update-service-price/"+id+'?_method=PUT',
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

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Service Price" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            
            
            <div className="col-sm-6 col-md-6 col-xl-4">
                <div className="form-group">
                <TextField
                  fullWidth
                  required
                  SelectProps={{
                    MenuProps: {},
                    }}
                    select
                  label="Service"
                  autoComplete="Name"
                  name="service_id"
                  value={services.service_id}
                  onChange={(e) => onInputChange(e)}
                >
                    {serdata.map((serdatas, key) => (
                        <MenuItem key={key} value={serdatas.id}>
                            {serdatas.service}
                        </MenuItem>
                        ))}
                </TextField>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-4">
                <div className="form-group">
                <TextField
                  fullWidth
                  label="Service Sub"
                  autoComplete="Name"
                  name="service_sub_id"
                  SelectProps={{
                    MenuProps: {},
                    }}
                    select
                  value={services.service_sub_id}
                  onChange={(e) => onInputChange(e)}
                >
                    {serdatasub.map((serdatas, key) => (
                        <MenuItem key={key} value={serdatas.id}>
                            {serdatas.service_sub}
                        </MenuItem>
                        ))}
                </TextField>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Service Price For"
                  autoComplete="Name"
                  name="service_price_for"
                  value={services.service_price_for}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Service Rate"
                  autoComplete="Name"
                  name="service_price_rate"
                  value={services.service_price_rate}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Service Amount"
                  autoComplete="Name"
                  name="service_price_amount"
                  value={services.service_price_amount}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  required
                  select
                  label="Status"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="service_price_status"
                  value={services.service_price_status}
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
