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
import useEscapeKey from "../escape/useEscapeKey";

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

const whatsapp = [
  {
    value: "Yes",
    label: "Yes",
},
{
  value: "No",
  label: "No",
},
]

const Add = (props) => {

  const autoCompleteRef = useRef(null);
    const [query, setQuery] = useState("");
    const [query1, setQuery1] = useState("");
    const [query2, setQuery2] = useState("");
    const [query3, setQuery3] = useState("");

    

    let history = useHistory();
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

    const [booking, setBooking] = useState({
        order_date: todayback,
        order_year: "2024-25",
        order_refer_by: "",
        order_customer: "",
        order_customer_mobile: "",
        order_customer_email: "",
        order_service_date: todayback,
        order_service: "",
        order_service_sub: "",
        order_service_price_for: "",
        order_service_price: "",
        order_custom: "",
        order_custom_price: "",
        order_discount: "",
        order_amount: "",
        
        order_flat: "",
        order_building: "",
        order_landmark: "",
        order_advance: "",
        order_km: "",
        order_time: "",
        order_remarks: "",
        order_comment: "",
        branch_id: localStorage.getItem('user_type_id') == '6' ? "" : localStorage.getItem('branch_id'),
        order_area: "",
        order_address: query,
        order_url: query1,
        order_send_whatsapp: "",
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

    const validateOnlyNumber = (inputtxt) => {
      var phoneno = /^\d*\.?\d*$/;
      if(inputtxt.match(phoneno) || inputtxt.length==0){
        return true;
      }else{
          return false;
      }
  }

    const onInputChange = (e) => {
      if(e.target.name=="order_customer_mobile"){

        if(validateOnlyDigits(e.target.value)){
          setBooking({
            ...booking,
            [e.target.name]: e.target.value,
          });  
        }
      }else if(e.target.name=="order_service_price"){

        if(validateOnlyDigits(e.target.value)){
          setBooking({
            ...booking,
            [e.target.name]: e.target.value,
          });  
        }
      }else if(e.target.name=="order_custom_price"){

        if(validateOnlyDigits(e.target.value)){
          setBooking({
            ...booking,
            [e.target.name]: e.target.value,
          }); 
          
          setBooking(booking => ({
            ...booking,
            order_amount: e.target.value
            }));
        }
      }else if(e.target.name=="order_amount"){

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
      }else if(e.target.name=="order_km"){

        if(validateOnlyNumber(e.target.value)){
          setBooking({
            ...booking,
            [e.target.name]: e.target.value,
          });  
        }
      }else if(e.target.name=="order_pincode"){

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

    const [timeslot, setTimeSlot] = useState([]);
    useEffect(() => {
        fetch(baseURL+'/panel-fetch-timeslot-out')
        .then(response => response.json())
        .then(data => setTimeSlot(data.timeslot)); 
    }, []);

    const [referby, setReferby] = useState([]);
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
  
  
      fetch(baseURL+'/panel-fetch-referby', requestOptions)
      .then(response => response.json())
      .then(data => setReferby(data.referby)); 
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

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });
    useEscapeKey();
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
  
  
      fetch(baseURL+'/panel-fetch-service-sub/'+booking.order_service, requestOptions)
      .then(response => response.json())
      .then(data => setSerDataSub(data.servicesub)); 
    }, [booking.order_service]);

    const [pricedata, setPriceData] = useState([]);
    
    const HalfA = (selectedValue) =>{
        localStorage.setItem("tempService",selectedValue.target.value)
        let data = {
            order_service: selectedValue.target.value,
            order_service_sub: booking.order_service_sub,
        }

        axios({
            url: baseURL+"/panel-fetch-service-price",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            
            setPriceData(res.data.serviceprice);
            
            
        });
        
    }

    const HalfB = (selectedValue) =>{
        
        let data = {
            order_service: localStorage.getItem("tempService"),
            order_service_sub: selectedValue.target.value,
        }

        axios({
            url: baseURL+"/panel-fetch-service-price",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            
            setPriceData(res.data.serviceprice);
            
            
        });
        
    }

    const HalfC = (selectedValue) =>{
        
        let data = {
            order_service_price_for: selectedValue.target.value,
        }

        axios({
            url: baseURL+"/panel-fetch-services-prices",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            setBooking(booking => ({
                ...booking,
                order_service_price: res.data.serviceprice.service_price_amount
            }));
            setBooking(booking => ({
                ...booking,
                order_amount: res.data.serviceprice.service_price_amount
            }));
            
        });
        
    }

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
      
      var addressComponents = addressObject.address_components;
      var city = addressComponents.find(component => component.types.includes('locality'));
  
      const latLng = {
        lat: addressObject?.geometry?.location?.lat(),
        lng: addressObject?.geometry?.location?.lng(),
      };
  
      fetch(baseURL+'/panel-fetch-check-brancharea-out/'+city.long_name)
        .then(response => response.json())
        .then(data =>{
            if(data.code == 200){
                setQuery2(city.long_name);
                setQuery3(data.area.branch_id);
                setIsButtonDisabled(false);
            }else{
                NotificationManager.error("We dont Service in this " +city.long_name+ " Area");
                setIsButtonDisabled(true);
            }
        })
      
      setQuery1(url)
      setSelectedLocation(latLng);
  };

  useEffect(() => {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
        () => handleScriptLoad(setQuery, autoCompleteRef)
      );
    }, []);

    const onSubmit = (e) => {
        let data = {
            order_date : booking.order_date,
            order_year : booking.order_year,
            order_refer_by : booking.order_refer_by,
            order_customer: booking.order_customer,
            order_customer_mobile: booking.order_customer_mobile,
            order_customer_email: booking.order_customer_email,
            order_service_date: booking.order_service_date,
            order_service: booking.order_service,
            order_service_sub: booking.order_service_sub,
            order_service_price_for: booking.order_service_price_for,
            order_service_price: booking.order_service_price,
            order_custom: booking.order_custom,
            order_custom_price: booking.order_custom_price,
            order_discount: booking.order_discount,
            order_amount: booking.order_amount,
            order_advance: booking.order_advance,
            order_flat: booking.order_flat,
            order_building: booking.order_building,
            order_landmark: booking.order_landmark,
            order_km: booking.order_km,
            order_time: booking.order_time,
            order_remarks: booking.order_remarks,
            order_comment: booking.order_comment,
            branch_id: query3,
            order_area: query2,
            order_address: query,
            order_url: query1,
            order_send_whatsapp: booking.order_send_whatsapp,
        };
        
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-create-booking",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Inserted Sucessfully");
                history.goBack();
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

   

    const hr = {
        marginTop: "0rem",
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Booking" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
          
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Refer By"
                  autoComplete="Name"
                  name="order_refer_by"
                  select
                  SelectProps={{
                    MenuProps: {},
                }}
                  value={booking.order_refer_by}
                  onChange={(e) => onInputChange(e)}
                  >
                  {referby.map((referbydata, key) => (
                      <MenuItem key={key} value={referbydata.refer_by}>
                          {referbydata.refer_by}
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
                    label="Customer"
                    autoComplete="Name"
                    name="order_customer"
                    value={booking.order_customer}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Mobile No"
                    autoComplete="Name"
                    name="order_customer_mobile"
                    inputProps={{ maxLength: 10, minLength: 10 }}
                    value={booking.order_customer_mobile}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    autoComplete="Name"
                    name="order_customer_email"
                    value={booking.order_customer_email}
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
                    id="order_service_date"
                    label="Service Date"
                    min={today}
                    type="date"
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
                    label="Service"
                    autoComplete="Name"
                    SelectProps={{
                        MenuProps: {},
                    }}
                    select
                    name="order_service"
                    value={booking.order_service}
                    onChange={(e) => {onInputChange(e),HalfA(e)}}
                    >
                    {serdata.map((serdatas, key) => (
                        <MenuItem key={key} value={serdatas.id}>
                            {serdatas.service}
                        </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>
            {booking.order_service == '23' ? "" : serdatasub.length > 0 ? 
            
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Service Sub"
                    autoComplete="Name"
                    SelectProps={{
                        MenuProps: {},
                    }}
                    select
                    name="order_service_sub"
                    value={booking.order_service_sub}
                    onChange={(e) => {onInputChange(e),HalfB(e)}}
                    >
                    {serdatasub.map((serdatas, key) => (
                        <MenuItem key={key} value={serdatas.id}>
                            {serdatas.service_sub}
                        </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>
            : ''}
            {booking.order_service == '23' ? '' : 
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Price For"
                    SelectProps={{
                        MenuProps: {},
                    }}
                    select
                    autoComplete="Name"
                    name="order_service_price_for"
                    value={booking.order_service_price_for}
                    onChange={(e) => {onInputChange(e),HalfC(e)}}
                    >
                    {pricedata.map((pricedatas, key) => (
                        <MenuItem key={key} value={pricedatas.id}>
                            {pricedatas.service_price_for} - {pricedatas.service_price_rate}
                        </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>
            }
        </div>
        <div className="row">
            {/* <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Price"
                    disabled
                    autoComplete="Name"
                    name="order_service_price"
                    value={booking.order_service_price}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div> */}
            {
              booking.order_service == '23' &&
            <>
            <div className="col-sm-12 col-md-12 col-xl-9">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Custom Service"
                    autoComplete="Name"
                    name="order_custom"
                    value={booking.order_custom}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Custom Price"
                    autoComplete="Name"
                    name="order_custom_price"
                    value={booking.order_custom_price}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            </>}
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
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    type="time"
                    label="Time Slot"
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    label="KM"
                    autoComplete="Name"
                    name="order_km"
                    value={booking.order_km}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            {/* {localStorage.getItem('user_type_id') == '6' ?
            <div className="col-sm-12 col-md-12 col-xl-2">
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

          {/* <div className="col-sm-12 col-md-12 col-xl-2">
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
        </div>
        <h1>Address</h1>
        <hr style={hr} />
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="form-group">
                
                <input
                    ref={autoCompleteRef}
                    id="order_address"
                    required
                    className="form-control"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search Places ..."
                    value={query}
                />
                </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-6">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="House #/Flat #/ Plot #"
                    autoComplete="Name"
                    name="order_flat"
                    value={booking.order_flat}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>  
            {/* <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Apartment/Building"
                    autoComplete="Name"
                    name="order_building"
                    value={booking.order_building}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>  */}
            <div className="col-sm-12 col-md-12 col-xl-6">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Landmark"
                    autoComplete="Name"
                    name="order_landmark"
                    value={booking.order_landmark}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>     
            
            <div className="col-sm-12 col-md-12 col-xl-3">
            <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Send watsupp to Customer"
                  autoComplete="Name"
                  name="order_send_whatsapp"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={booking.order_send_whatsapp}
                  onChange={(e) => onInputChange(e)}
                >
                  {whatsapp.map((areadata, key) => (
                                    <MenuItem key={key} value={areadata.value}>
                                        {areadata.label}
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
                    multiline
                    autoComplete="Name"
                    name="order_remarks"
                    value={booking.order_remarks}
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

export default Add;
