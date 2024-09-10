import React, { useEffect, useState, useRef } from "react";
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
import {REACT_APP_GOOGLE_MAPS_KEY } from "../../container/constants";
import "./area.css";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

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
    const autoCompleteRef = useRef(null);
    const [query, setQuery] = useState("");
    const [query1, setQuery1] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [area, setArea] = useState({
        branch_id: "",
        area: "",
        area_status: "",
        area_address:query,
        area_url:query1,
        area_lat:lat,
        area_lng:lng,
    });

    useEffect(() => {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
        () => handleScriptLoad(setQuery, autoCompleteRef)
      );
    }, []);

    const handleScriptLoad = (updateQuery, autoCompleteRef) => {
      autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        {
          componentRestrictions: { country: "IN" },
        }
      );
  
      autoComplete.addListener("place_changed", () => {
        handlePlaceSelect(updateQuery);
      });
  };

    const handlePlaceSelect = async (updateQuery) => {
      const addressObject = await autoComplete.getPlace();
  
      const query = addressObject.formatted_address;
      const url = addressObject.url;
      updateQuery(query);
      
  
      const latLng = {
        lat: addressObject?.geometry?.location?.lat(),
        lng: addressObject?.geometry?.location?.lng(),
      };
      
      setLat(latLng.lat);
      setLng(latLng.lng);
      setQuery1(url);

      
  };

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

      if(e.target.name=="area"){

        if(validateOnlyText(e.target.value)){
          setArea({
            ...area,
            [e.target.name]: e.target.value,
          });  
        }
      }else{
        setArea({
          ...area,
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
            url: baseURL+"/panel-fetch-area-by-id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setArea(res.data.area);
            setLat(res.data.area.area_lat);
            setLng(res.data.area.area_lng);
            setQuery(res.data.area.area_address);
            setQuery1(res.data.area.area_url);

      
          });
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

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("area",area.area);
        data.append("area_status",area.area_status);
        data.append("branch_id",area.branch_id);
        data.append("area_address",query);
        data.append("area_url",query1);
        data.append("area_lat",lat);
        data.append("area_lng",lng);

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-update-area/"+id+'?_method=PUT',
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
      <PageTitleBar title="Edit Area" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Branch"
                  disabled
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  autoComplete="Name"
                  name="branch_id"
                  value={area.branch_id}
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
              <div className="col-sm-6 col-md-6 col-xl-4">
                <div className="form-group">
                  <TextField
                    fullWidth
                    required
                    disabled
                    label="Area"
                    autoComplete="Name"
                    name="area"
                    value={area.area}
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
                  name="area_status"
                  value={area.area_status}
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
            <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="form-group">
                                                
                <input
                    ref={autoCompleteRef}
                    id="area_address"
                    required
                    className="form-control"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search Places ..."
                    value={query}
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
