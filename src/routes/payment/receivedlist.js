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
export default class PaymentReceivedList extends React.Component {
  state = {
    loader: true,
    users: [],
    id:"",
    bookinguserData: [],
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
        "Area",
        {
          name: "Customer",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
        {
          name: "Mobile",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
        
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
          name: "Paid Amount",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
        {
          name: "Paid Type",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
      {
        name: "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View">
                    <Link
                    style={{
                      display: localStorage.getItem("user_type_id") == 1 ? "none" : "",
                    }}
                      to={"viewReceived?id=" + value.substr(value.indexOf("#")+1, value.length-1)}
                    >
                      <VisibilityIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title="Update Payment Status to Not Received" placement="top">
                  <IconButton
                    aria-label="Update Payment Status to Not Received"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 3
                        ? "none" : "",
                    }}
                  >
                    <a style={{color:'#5D92F4'}} onClick={(e) => this.updateData(e,value.substr(value.indexOf("#")+1, value.length-1))} >
                        <EditIcon />
                    </a>
                  </IconButton>
                </Tooltip> */}
                
                
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
      url: baseURL+"/panel-update-payment-status/"+value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        this.getData();
      NotificationManager.success("Data Update Sucessfully");
    })
  };

  getData = () => {
    let result = [];
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    this.setState({id:id});
    axios({
      url: baseURL+"/panel-fetch-payment-received-list",
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
                response[i]["order_area"],
                response[i]["order_customer"],
                response[i]["order_customer_mobile"],
                Moment(response[i]["order_date"]).format('DD-MM-YYYY'),
                Moment(response[i]["order_service_date"]).format('DD-MM-YYYY'),
                (response[i]["order_custom_price"] <= '1' ? response[i]["order_service"] : response[i]["order_custom"]),
                (response[i]["order_custom_price"] <= '1' ? response[i]["order_amount"] : response[i]["order_custom_price"]),
                response[i]["order_payment_amount"],
                response[i]["order_payment_type"],
                response[i]["order_status"]+'#'+response[i]["id"],
            ]);
          
        }
        this.setState({ bookinguserData: tempRows, loader: false });
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
              title="Payment Received List"
              match={this.props.match}
            />
            
            <RctCollapsibleCard fullBlock>
              {this.state.bookinguserData.length > 0 && (
                <MUIDataTable
                  title={"Payment Received List"}
                  data={this.state.bookinguserData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.bookinguserData.length <= 0 && (
                <MUIDataTable
                  title={"Payment Received List"}
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
