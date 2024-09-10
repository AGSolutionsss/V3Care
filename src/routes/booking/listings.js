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
import Moment from 'moment';
import VisibilityIcon from "@material-ui/icons/Visibility";

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListBooking extends React.Component {
  state = {
    loader: true,
    users: [],
    bookingData: [],
    columnData: [
      {
        name: "ID",
        options: {
          filter: false,
          print:true,
          download:true,
        },
      },
      
       
        "Branch",
        {
          name: "Customer",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
        "Mobile",
        "Booking Date",
        "Service Date",
        {
          name: "Service",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
        {
          name: "Price",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
        {
          name: "Status",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
      {
        name: localStorage.getItem("user_type_id") == 1 ? "" : "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="Edit" placement="top"> 
                  <IconButton
                    aria-label="Edit"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 1
                        ? "none" : "",
                    }}
                  >
                    <Link to={"edit?id=" + value.substr(value.indexOf("#")+1, value.length-1)}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                {(value.startsWith('Confirmed')) &&
                <Tooltip title="To Assign User" placement="top">
                  <IconButton
                    aria-label="To Assign User"
                  >
                    <Link style={{
                      display: localStorage.getItem("user_type_id") == 1 ? "none" : "",
                    }} to={"bookingUser?id=" + value.substr(value.indexOf("#")+1, value.length-1)}>
                      <i class="zmdi zmdi-accounts-add"></i>
                    </Link>
                  </IconButton>
                </Tooltip>
                }
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View">
                    <Link
                    style={{
                      display: localStorage.getItem("user_type_id") == 1 ? "none" : "",
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
  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/panel-fetch-booking-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.booking;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
                response[i]["order_ref"],
                response[i]["branch_name"],
                response[i]["order_customer"],
                response[i]["order_customer_mobile"],
                Moment(response[i]["order_date"]).format('DD-MM-YYYY'),
                Moment(response[i]["order_service_date"]).format('DD-MM-YYYY'),
                (response[i]["order_custom_price"] <= '1' ? response[i]["order_service"] : response[i]["order_custom"]),
                (response[i]["order_custom_price"] <= '1' ? response[i]["order_amount"] : response[i]["order_custom_price"]),
                response[i]["order_status"],
                response[i]["order_status"]+'#'+response[i]["id"],
            ]);
          
        }
        this.setState({ bookingData: tempRows, loader: false });
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
              title="Pending Booking List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 3 ? "none" : "inline-block" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Booking
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.bookingData.length > 0 && (
                <MUIDataTable
                  title={"Pending Bookig List"}
                  data={this.state.bookingData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.bookingData.length <= 0 && (
                <MUIDataTable
                  title={"Pending Bookig List"}
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
