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

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class BookingVendorList extends React.Component {
  state = {
    loader: true,
    users: [],
    id:"",
    bookinguserData: [],
    columnData: [
      {
        name: "#",
        options: {
          filter: false,
          print:false,
          download:false,
        }
      },
      "Full Name",
      "Start Time",
      "End Time",
      "Remarks",
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
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 3
                        ? "none" : "",
                    }}
                  >
                    <Link to={"editBookingVendor?id=" + value}>
                      <EditIcon />
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
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    this.setState({id:id});
    axios({
      url: baseURL+"/panel-fetch-booking-assign-vendor-list/"+id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.bookingAssign;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              response[i]["name"],
              response[i]["order_start_time"],
              response[i]["order_end_time"],
              response[i]["order_assign_remarks"],
              response[i]["order_assign_status"],
              response[i]["id"],
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
              title="Booking Vendor List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to={"addBookingVendor?id=" + this.state.id}>
                <Button
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Booking Vendor
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.bookinguserData.length > 0 && (
                <MUIDataTable
                  title={"Booking Vendor List"}
                  data={this.state.bookinguserData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.bookinguserData.length <= 0 && (
                <MUIDataTable
                  title={"Booking Vendor List"}
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
