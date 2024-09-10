import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../api';
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import QueueAnim from "rc-queue-anim";
import AppConfig from "Constants/AppConfig";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {REACT_APP_GOOGLE_MAPS_KEY } from "./constants";
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
 
const Partner = (props) => {

    const [vendor, setVendor] = useState({
        vendor_short: "",
        branch_id: "",
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
        vendor_ref_name_1: "",
        vendor_ref_name_2: "",
        vendor_ref_mobile_1: "",
        vendor_ref_mobile_2: "",
    });

    const [selectedFile1, setSelectedFile1] = React.useState(null);
    const [selectedFile2, setSelectedFile2] = React.useState(null);
    const [selectedFile3, setSelectedFile3] = React.useState(null);
    const [selectedFile4, setSelectedFile4] = React.useState(null);

    const [test, setTest] = useState([]);

    const handleChange = event => {
      setTest(event.target.value);
      console.log('check',event.target.value)
    };

    const [vendor_ser_count, setSerCount] = useState(1);
    const [vendor_branc_count, setBrancCount] = useState(1);
    const [vendor_area_count, setAreaCount] = useState(1);

    const useTemplate = {vendor_service:""};
    
    const [users, setUsers] = useState([useTemplate]);

    const addItem = () => {
      setUsers([...users,useTemplate]);
      setSerCount(vendor_ser_count + 1);
    }
    
    const onChange = (e, index) =>{
      const updatedUsers = users.map((user, i) => 
      index == i 
      ? Object.assign(user,{[e.target.name]: e.target.value}) 
      : user );
      setUsers(updatedUsers);
    };

    const removeUser = (index) => {
      const filteredUsers = [...users];
      filteredUsers.splice(index, 1);
      setUsers(filteredUsers);
      setSerCount(vendor_ser_count - 1);
    }

    const useTemplate1 = {vendor_branch_flat:"",vendor_branch_building:"",vendor_branch_landmark:"",vendor_branch_pincode:"",vendor_branch_location:"",vendor_branch_city:"",vendor_branch_district:"",vendor_branch_state:""};
    
    const [users1, setUsers1] = useState([useTemplate1]);

    const addItem1 = () => {
      setUsers1([...users1,useTemplate1]);
      setBrancCount(vendor_branc_count + 1);
    }
    
    const onChange1 = (e, index) =>{
      const updatedUsers = users1.map((user, i) => 
      index == i 
      ? Object.assign(user,{[e.target.name]: e.target.value}) 
      : user );
      setUsers1(updatedUsers);
    };

    const removeUser1 = (index) => {
      const filteredUsers = [...users1];
      filteredUsers.splice(index, 1);
      setUsers1(filteredUsers);
      setBrancCount(vendor_branc_count - 1);
    }

    const useTemplate2 = {vendor_area:""};
    
    const [users2, setUsers2] = useState([useTemplate2]);

    const addItem2 = () => {
      setUsers2([...users2,useTemplate2]);
      setAreaCount(vendor_area_count + 1);
    }
    
    const onChange2 = (e, index) =>{
      const updatedUsers = users2.map((user, i) => 
      index == i 
      ? Object.assign(user,{[e.target.name]: e.target.value}) 
      : user );
      setUsers2(updatedUsers);
    };

    const removeUser2 = (index) => {
      const filteredUsers = [...users2];
      filteredUsers.splice(index, 1);
      setUsers2(filteredUsers);
      setAreaCount(vendor_area_count - 1);
    }

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

    const [branch, setBranch] = useState([]);
    useEffect(() => {
        fetch(baseURL+'/panel-fetch-branch-out')
        .then(response => response.json())
        .then(data => setBranch(data.branch)); 
    }, []);

    const [servicess, setServicess] = useState([]);
    useEffect(() => {
        fetch(baseURL+'/panel-fetch-service-out')
        .then(response => response.json())
        .then(data => setServicess(data.service)); 
    }, []);

    const [area, setArea] = useState([]);
    useEffect(() => {
        fetch(baseURL+'/panel-fetch-brancharea-out/'+vendor.branch_id)
        .then(response => response.json())
        .then(data => setArea(data.area)); 
    }, [vendor.branch_id]);

    const onSubmit = (e) => {
        
          const data = new FormData();
          data.append("vendor_short",vendor.vendor_short);
          data.append("vendor_company",vendor.vendor_company);
          data.append("vendor_mobile",vendor.vendor_mobile);
          data.append("vendor_email",vendor.vendor_email);
          data.append("branch_id",vendor.branch_id);
          data.append("vendor_aadhar_no",vendor.vendor_aadhar_no);
          data.append("vendor_gst_no",vendor.vendor_gst_no);
          data.append("vendor_ref_name_1",vendor.vendor_ref_name_1);
          data.append("vendor_ref_mobile_1",vendor.vendor_ref_mobile_1);
          data.append("vendor_ref_name_2",vendor.vendor_ref_name_2);
          data.append("vendor_ref_mobile_2",vendor.vendor_ref_mobile_2);
          data.append("vendor_images",selectedFile1);
          data.append("vendor_aadhar_front",selectedFile2);
          data.append("vendor_aadhar_back",selectedFile3);
          data.append("vendor_aadhar_gst",selectedFile4);
          data.append("vendor_area_no_count",vendor_area_count);
          data.append("vendor_service_no_count",vendor_ser_count);
          data.append("vendor_branch_no_count",vendor_branc_count);
          data.append("vendor_service",test);
          users.forEach((user, index) => {
            Object.keys(user).forEach((key) => {
                data.append(`vendor_service_data[${index}][${key}]`, user[key]);
            });
        });
          users1.forEach((user, index) => {
            Object.keys(user).forEach((key) => {
                data.append(`vendor_branch_data[${index}][${key}]`, user[key]);
            });
        });
        users2.forEach((user, index) => {
          Object.keys(user).forEach((key) => {
              data.append(`vendor_area_data[${index}][${key}]`, user[key]);
          });
      });
  
          var url = new URL(window.location.href);
          var id = url.searchParams.get("id");
  
          var v = document.getElementById("addIndiv").checkValidity();
          var v = document.getElementById("addIndiv").reportValidity();
          e.preventDefault();
  
        if (v) {
            
            axios({
              url: baseURL+"/panel-create-vendor-out",
              method: "POST",
              data,
            }).then((res) => {
                if(res.data.code == '200'){
                    NotificationManager.success("Data Inserted Sucessfully");
                    setVendor(
                      {
                          
                        vendor_short: "",
                        branch_id: "",
                        vendor_company: "",
                        vendor_mobile: "",
                        vendor_email: "",
                        vendor_aadhar_no: "",
                        vendor_gst_no: "",
                        vendor_aadhar_front: "",
                        vendor_aadhar_back: "",
                        vendor_aadhar_gst: "",
                        vendor_service_no_count: "",
                        vendor_branch_no_count: "",
                        vendor_area_no_count: "",
                        vendor_service_data: "",
                        vendor_branch_data: "",
                        vendor_area_data: "",
                        vendor_images:"",
                        vendor_ref_name_1: "",
                        vendor_ref_mobile_1: "",
                        vendor_ref_name_2: "",
                        vendor_ref_mobile_2: "",
                      }
                  );
                  setSerCount(1);
                  setBrancCount(1);
                  setAreaCount(1);
                  setSelectedFile1(null);
                  setSelectedFile2(null);
                  setSelectedFile3(null);
                  setSelectedFile4(null);
                  
                }else{
                    if(res.data.code == '401'){
                        NotificationManager.error("Company Name Duplicate Entry");
                        
                    }else if(res.data.code == '402'){
                    NotificationManager.error("Mobile No Duplicate Entry");
                  
                    }else{
                    NotificationManager.error("Email Id Duplicate Entry");
                  
                    }
                  
                }
            });
        }
    };

    const [location, setLocation] = useState([]);

    const CheckPincode = (test,selectedValue) =>{
      const pincode = test.target.value;
      if(pincode.length == '6'){
      fetch('https://api.v3care.in/api/external/pin/'+pincode)
      .then(response => response.json())
      .then((response) =>{
        
          const tempUsers = [...users1];
         
          tempUsers[selectedValue].vendor_branch_city = response.city;
          tempUsers[selectedValue].vendor_branch_district = response.district;
          tempUsers[selectedValue].vendor_branch_state = response.state;
          setUsers1(tempUsers);
          if(response.areas != null){
            setLocation(response.areas);
          }
      })
    }
  }
    const hr = {
        marginTop: "0rem",
    };
  
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper">
                
            <div className="session-inner-wrapper" style={{marginTop:'-90px'}}>
              <div className="container">
                <div className="row row-eq-height">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="session-body text-center" style={{padding:'2rem 2.25rem'}}>
                    <div className="session-head mb-30">
                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="90" height="90" />
                      </div>
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
            <div className="col-sm-12 col-md-12 col-xl-3">
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
            
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Branch"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  required
                  autoComplete="Name"
                  name="branch_id"
                  value={vendor.branch_id}
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
            
            <div className="col-sm-12 col-md-12 col-xl-3">
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
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="GST No"
                  autoComplete="Name"
                  name="vendor_gst_no"
                  inputProps={{ maxLength: 15}}
                  value={vendor.vendor_gst_no}
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
                  type="file"
                  required
                  label="Photo"
                  InputLabelProps={{ shrink: true }}
                  autoComplete="Name"
                  name="vendor_images"
                  onChange={(e) => setSelectedFile1(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="file"
                  required
                  label="Aadhar Card Front Side"
                  InputLabelProps={{ shrink: true }}
                  autoComplete="Name"
                  name="vendor_aadhar_front"
                  onChange={(e) => setSelectedFile2(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="file"
                  required
                  label="Aadhar Card Back Side"
                  InputLabelProps={{ shrink: true }}
                  autoComplete="Name"
                  name="vendor_aadhar_back"
                  onChange={(e) => setSelectedFile3(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="file"
                  label="GST Certificate"
                  InputLabelProps={{ shrink: true }}
                  autoComplete="Name"
                  name="vendor_aadhar_gst"
                  onChange={(e) => setSelectedFile4(e.target.files[0])}
                />
              </div>
            </div>
            
            </div>
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  id="vendor_ref_name_1"
                  label="Reference  Name 1"
                  autoComplete="Name"
                  name="vendor_ref_name_1"
                  value={vendor.vendor_ref_name_1}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  id="vendor_ref_mobile_1"
                  label="Reference  Mobile No 1"
                  inputProps={{ maxLength: 10 }}
                  autoComplete="Name"
                  name="vendor_ref_mobile_1"
                  value={vendor.vendor_ref_mobile_1}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  id="vendor_ref_name_2"
                  label="Reference  Name 2"
                  autoComplete="Name"
                  name="vendor_ref_name_2"
                  value={vendor.vendor_ref_name_2}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  id="vendor_ref_mobile_2"
                  label="Reference  Mobile No 2"
                  inputProps={{ maxLength: 10 }}
                  autoComplete="Name"
                  name="vendor_ref_mobile_2"
                  value={vendor.vendor_ref_mobile_2}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
            
            <h1>Services Details</h1>
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
              
            

            <h1>Address Details</h1>
            <hr style={hr} />
            {
              users1.map((user, index)=> (
                <div className="row" key={index}>
                    <div className="col-sm-12 col-md-12 col-xl-3">
                        <div className="form-group">
                            <TextField
                                id="select-corrpreffer"
                                label="Pincode"
                                name="vendor_branch_pincode"
                                required
                                value={user.vendor_branch_pincode}
                                onChange={e => {onChange1(e, index), CheckPincode(e,index)}}
                                fullWidth
                                />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-3">
                        <div className="form-group">
                            <TextField
                                id="select-corrpreffer"
                                label="City"
                                required
                                disabled
                                name="vendor_branch_city"
                                value={user.vendor_branch_city}
                                onChange={e => onChange1(e, index)}
                                fullWidth
                                />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-3">
                        <div className="form-group">
                            <TextField
                                id="select-corrpreffer"
                                label="District"
                                required
                                disabled
                                name="vendor_branch_district"
                                value={user.vendor_branch_district}
                                onChange={e => onChange1(e, index)}
                                fullWidth
                                />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-3">
                        <div className="form-group">
                            <TextField
                                id="select-corrpreffer"
                                label="State"
                                disabled
                                required
                                name="vendor_branch_state"
                                value={user.vendor_branch_state}
                                onChange={e => onChange1(e, index)}
                                fullWidth
                               />
                                  
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-2">
                        <div className="form-group">
                            <TextField
                                id="select-corrpreffer"
                                label="Street/Location/Village"
                                name="vendor_branch_location"
                                required
                                value={user.vendor_branch_location}
                                onChange={e => onChange1(e, index)}
                                SelectProps={{
                                  MenuProps: {},
                                }}
                                select
                                fullWidth
                                >
                                {location.map((statedata, key) => (
                                  <MenuItem key={key} value={statedata}>
                                      {statedata}
                                  </MenuItem>
                              ))}
                              </TextField>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-3">
                        <div className="form-group">
                            <TextField
                                id="select-corrpreffer"
                                label="House #/Flat #/ Plot #"
                                name="vendor_branch_flat"
                                value={user.vendor_branch_flat}
                                onChange={e => onChange1(e, index)}
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-3">
                        <div className="form-group">
                            <TextField
                                id="select-corrpreffer"
                                label="Apartment/Building"
                               name="vendor_branch_building"
                                value={user.vendor_branch_building}
                                onChange={e => onChange1(e, index)}
                                fullWidth
                                />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-3">
                        <div className="form-group">
                            <TextField
                                id="select-corrpreffer"
                                label="Landmark"
                                name="vendor_branch_landmark"
                                value={user.vendor_branch_landmark}
                                onChange={e => onChange1(e, index)}
                                fullWidth
                                />
                        </div>
                    </div>
                    
                    
                    {/* <div className="col-sm-12 col-md-12 col-xl-1">
                        <IconButton onClick={() => removeUser1(index)}>
                            <DeleteIcon/>
                        </IconButton>
                    </div> */}
                </div>
              ))
            }
            {/* <div className="row mt-4">
              <div className="col-sm-12 col-md-12 col-xl-12">
                <Button className="mr-10 mb-10" color="primary" style={{width:"100px"}} variant="contained" onClick={(e) => addItem1(e)}>
                  Add Branch</Button>
              </div>
            </div> */}

            <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
            <div className="receiptbuttons" style={{textAlign:'center'}}>
            <Button
              type="submit"
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              
            >
              Submit
            </Button>
            
          </div>
            </div>
          </div>

          <div className="antifloat"></div>
        </form>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </QueueAnim>
    );
  
}
export default Partner;