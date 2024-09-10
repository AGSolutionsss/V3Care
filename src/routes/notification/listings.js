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

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListNotification extends React.Component {
  state = {
    loader: true,
    users: [],
    notificationData: [],
    columnData: [
      {
        name: "#",
        options: {
          filter: false,
          print:false,
          download:false,
        }
      },
      {
        name: "Images",
        options: {
          filter: false,
          download:false,
        }
      },
      "Date",
      "Heading",
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
                <Tooltip title="Update Status to Inactive" placement="top">
                  <IconButton
                    aria-label="Update Status to Inactive"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 3
                        ? "none" : "",
                    }}
                  >
                    <a style={{color: 'rgba(13, 126, 247, 0.54)'}} onClick={this.sendEmail.bind(this,value.substr(value.indexOf("#")+1, value.length-1))}>
                    <EditIcon />
                    </a>
                    
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
      url: baseURL+"/panel-fetch-notification-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.notification;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              <img src={(response[i]["notification_image"]  === null || response[i]["notification_image"] === '' ? "https://agsdraft.online/app/storage/app/public/no_image.jpg" : "https://agsdraft.online/app/storage/app/public/notification_images/"+response[i]["notification_image"])} style={{width:'40px',height:'40px'}}/>,
              Moment(response[i]["notification_create_date"]).format('DD-MM-YYYY'),
              response[i]["notification_heading"],
              response[i]["notification_status"],
              response[i]["notification_status"]+'#'+response[i]["id"]
            ]);
          
        }
        this.setState({ notificationData: tempRows, loader: false });
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

  sendEmail = (value) => {
    
    axios({
      url: baseURL+"/panel-update-notification/"+value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        
        this.getData();
        NotificationManager.success("Booking Created Sucessfully");
      
    })
  };
  
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
              title="Notification List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 3 ? "none" : "inline-block" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Notification
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.notificationData.length > 0 && (
                <MUIDataTable
                  title={"Notification List"}
                  data={this.state.notificationData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.notificationData.length <= 0 && (
                <MUIDataTable
                  title={"Notification List"}
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
