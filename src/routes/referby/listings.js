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
export default class NewListReferBy extends React.Component {
  state = {
    loader: true,
    users: [],
    referbyData: [],
    columnData: [
      {
        name: "#",
        options: {
          filter: false,
          print:false,
          download:false,
        }
      },
      
      "Refer By",
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
      url: baseURL+"/panel-fetch-referby-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.referby;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              
              response[i]["refer_by"],
              response[i]["refer_by_status"],
              response[i]["id"],
            ]);
          
        }
        this.setState({ referbyData: tempRows, loader: false });
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
              title="Refer By List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 3 ? "none" : "inline-block" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Refer By
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.referbyData.length > 0 && (
                <MUIDataTable
                  title={"Refer By List"}
                  data={this.state.referbyData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.referbyData.length <= 0 && (
                <MUIDataTable
                  title={"Refer By List"}
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
