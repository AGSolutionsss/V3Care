import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {  NotificationManager,} from "react-notifications";

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListVendor extends React.Component {
  state = {
    loader: true,
    users: [],
    vendorData: [],
    columnData: [
      {
        name: "#",
        options: {
          filter: false,
          print:false,
          download:false,
        }
      },
      "Branch",
      "Short",
      "Company",
      "Mobile",
      "Email",
      "Status",
      {
        name: "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                {value.startsWith('Pending') &&
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 3
                        ? "none" : "",
                    }}
                  >
                    <Link to={"editVendor?id=" + value.substr(value.indexOf("#")+1, value.length-1)}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                }
                {!value.startsWith('Pending') &&
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 3
                        ? "none" : "",
                    }}
                  >
                    <Link to={"edit?id=" + value.substr(value.indexOf("#")+1, value.length-1)}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                }
                {!value.startsWith('Pending') &&
                <Tooltip title="Vendor User List" placement="top">
                  <IconButton
                    aria-label="Vendor User List"
                  >
                    <Link to={"vendorUser?id=" + value.substr(value.indexOf("#")+1, value.length-1)}>
                      <i class="zmdi zmdi-accounts"></i>
                    </Link>
                  </IconButton>
                </Tooltip>
                }
                {value.startsWith('Pending') &&
                <Tooltip title="To Create Vendor has User" placement="top">
                  <IconButton
                    aria-label="To Create Vendor has User"
                  >
                    <a style={{color:'#5D92F4'}} onClick={(e) => this.updateData(e,value.substr(value.indexOf("#")+1, value.length-1))} >
                      <i class="zmdi zmdi-account-add"></i>
                    </a>
                  </IconButton>
                </Tooltip>
                }
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View">
                    <Link
                    style={{
                      display: this.state.usertype == 4 ? "none" : "",
                    }}
                      to={"view?id=" + value.substr(value.indexOf("#")+1, value.length-1)}
                    >
                      <VisibilityIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                
              </div>
            );
          },
        },
      },
    ],
  };

  updateData = (e,value) => {
    e.preventDefault();
    axios({
      url: baseURL+"/panel-create-vendor-has-users/"+value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      if(res.data.code == '200'){

      
      let response = res.data.vendor;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              response[i]["branch_name"],
              response[i]["vendor_short"],
              response[i]["vendor_company"],
              response[i]["vendor_mobile"],
              response[i]["vendor_email"],
              response[i]["vendor_status"],
              response[i]["vendor_status"]+'#'+response[i]["id"],
            ]);
          
        }
        
        this.setState({ vendorData: tempRows, loader: false });
        
      this.getData();
      
      NotificationManager.success("User Created Sucessfully");
    }else if(res.data.code == '401'){
      NotificationManager.error("This Company Name is already Activated");
    }else if(res.data.code == '402'){
      NotificationManager.error("Duplicate Entry of Mobile No");
    }else if(res.data.code == '403'){
      NotificationManager.error("Duplicate Entry of Email Id");
    }
    })
  };

  inactvieData = (e,value) => {
    e.preventDefault();
    let data = {
      vendor_status: "Inactive"
    };
    axios({
      url: baseURL+"/panel-update-vendor-status/"+value,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      let response = res.data.vendor;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              response[i]["branch_name"],
              response[i]["vendor_short"],
              response[i]["vendor_company"],
              response[i]["vendor_mobile"],
              response[i]["vendor_email"],
              response[i]["vendor_status"],
              response[i]["vendor_status"]+'#'+response[i]["id"],
            ]);
          
        }
        
        this.setState({ vendorData: tempRows, loader: false });
        
      this.getData();
      
      NotificationManager.success("User Created Sucessfully");
    })
  };

  actvieData = (e,value) => {
    e.preventDefault();
    let data = {
      vendor_status: "Active"
    };
    axios({
      url: baseURL+"/panel-update-vendor-status/"+value,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      let response = res.data.vendor;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              response[i]["branch_name"],
              response[i]["vendor_short"],
              response[i]["vendor_company"],
              response[i]["vendor_mobile"],
              response[i]["vendor_email"],
              response[i]["vendor_status"],
              response[i]["vendor_status"]+'#'+response[i]["id"],
            ]);
          
        }
        
        this.setState({ vendorData: tempRows, loader: false });
        
      this.getData();
      
      NotificationManager.success("User Created Sucessfully");
    })
  };

  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/panel-fetch-vendor-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.vendor;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              response[i]["branch_name"],
              response[i]["vendor_short"],
              response[i]["vendor_company"],
              response[i]["vendor_mobile"],
              response[i]["vendor_email"],
              response[i]["vendor_status"],
              response[i]["vendor_status"]+'#'+response[i]["id"],
            ]);
          
        }
        this.setState({ vendorData: tempRows, loader: false });
      })
      .catch((res) => {
        this.setState({ loader: false });
      });
  };
  componentDidMount() {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    
    this.getData();
  }
  
  render() {
    const { loader } = this.state;
    let usertype = localStorage.getItem("user_type_id");
    return (
      <div className="data-table-wrapper">
        {loader && (
          <CircularProgress
            disableShrink
            style={{
              marginLeft: "600px",
              marginTop: "300px",
              marginBottom: "300px",
            }}
            color="secondary"
          />
        )}
        {!loader && (
          <>
            <PageTitleBar
              title="Vendor List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 3 ? "none" : "inline-block" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Vendor
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.vendorData.length > 0 && (
                <MUIDataTable
                  title={"Vendor List"}
                  data={this.state.vendorData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.vendorData.length <= 0 && (
                <MUIDataTable
                  title={"Vendor List"}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
            </RctCollapsibleCard>
          </>
        )}
      </div>
    );
  }
}
