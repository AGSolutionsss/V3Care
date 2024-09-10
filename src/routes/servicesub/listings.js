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
export default class NewListServiceSub extends React.Component {
  state = {
    loader: true,
    users: [],
    serviceData: [],
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
      "Service",
      "Service Sub",
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
                    <Link to={"edit?id=" + value}>
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
    axios({
      url: baseURL+"/panel-fetch-service-sub-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.servicesub;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              <img src={(response[i]["service_sub_image"]  === null || response[i]["service_sub_image"] === '' ? "https://agsdraft.online/app/storage/app/public/no_image.jpg" : "https://agsdraft.online/app/storage/app/public/service_sub/"+response[i]["service_sub_image"])} style={{width:'40px',height:'40px'}}/>,
              response[i]["service"],
              response[i]["service_sub"],
              response[i]["service_sub_status"],
              response[i]["id"],
            ]);
          
        }
        this.setState({ serviceData: tempRows, loader: false });
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
              title="Service Sub List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 3 ? "none" : "inline-block" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Service Sub
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.serviceData.length > 0 && (
                <MUIDataTable
                  title={"Service Sub List"}
                  data={this.state.serviceData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.serviceData.length <= 0 && (
                <MUIDataTable
                  title={"Service Sub List"}
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
