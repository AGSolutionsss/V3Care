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
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import useEscapeKey from "../escape/useEscapeKey";

const Add = (props) => {

    let history = useHistory();

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    const [vendor, setVendor] = useState({});

    

    const [test, setTest] = useState([]);

    const handleChange = event => {
      setTest(event.target.value);
      console.log('check',event.target.value)
    };

    
   

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
    
    

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });

    

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

    

    const onSubmit = (e) => {

      const data = new FormData();
        
        data.append("vendor_service",test);
        

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true);
        axios({
            url: baseURL+"/panel-update-vendors-services/"+id+'?_method=PUT',
            method: "Post",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data updated Sucessfully");
                history.push("listing");
            }else{
              
                NotificationManager.error(" Duplicate Entry");
                setIsButtonDisabled(false);
              
                
            }
            
        });
        }
    };

    

    

    const hr = {
        marginTop: "0rem",
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Add Vendor Service" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
            <h1>Service Details</h1>
            <hr style={hr} />
            <div className="row">
                <div className="col-sm-12 col-md-12 col-xl-12">
            <div className="form-group">
              <FormControl fullWidth>
                <InputLabel htmlFor="select-multiple-checkbox">Service*</InputLabel>
                <Select multiple value={test}
                  onChange={handleChange}
                  required
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  >
                  {servicess.map(name => (
                    <MenuItem key={name.service} value={name.service}>
                      <Checkbox color="primary" checked={test === name.service} />
                      <ListItemText primary={name.service} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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