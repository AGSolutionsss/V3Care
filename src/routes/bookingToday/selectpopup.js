import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import {baseURL} from '../../api';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { useHistory, useParams } from "react-router-dom";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import IntlMessages from "Util/IntlMessages";


const option = {
  filterType: "textField",
  print: false,
  viewColumns: false,
  filter: false,
  searchOpen:true,
  download:false,
  selectableRows: false,
};

const labelBorder = {
  paddingTop:'5px',
  border:'1px solid #4d4b4b',
}

const labelTableSub = {
  width:'25%',
  border: '1px solid black',
}

const labelslabel = {
    
  fontSize: '13px',
  fontWeight: '400',
  paddingTop:'5px',
  paddingBottom: '5px',
  paddingLeft: '10px',
  paddingRight: '10px',
  height: '30px !important',
  margin: '0px !important',
  color: "rgb(0, 0, 0)",
};

const labelslabelSpan = {
  fontWeight: '500',
  fontSize: '13px',
  paddingTop:'5px',
  paddingBottom: '5px',
  paddingLeft: '10px',
  paddingRight: '10px',
}

export default class AddToGroup extends React.Component {
  
  state = {
    loader: true,
    message:'',
    users: [],
    donorData: [],
    columnData: [
      "Full Name ",
      "Start Time",
      "On the Way Time",
      "End Time",
      "Status"
    ],
  };
  
 
  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/panel-fetch-booking-assign-by-view/"+this.props.bookingid,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        this.setState({ donorData: res.data.bookingAssign, loader: false });
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
    let usertype = localStorage.getItem("id");
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
           

            <RctCollapsibleCard fullBlock>
              {this.state.donorData.length > 0 && (
                <table>
                  <thead>
                    <tr style={labelBorder}>
                      <th style={labelTableSub}>
                          <span style={labelslabel}>Full Name</span>    
                      </th>    
                      <th style={labelTableSub}>
                          <span style={labelslabel}>Start Time</span>    
                      </th>
                      <th style={labelTableSub}>
                          <span style={labelslabel}>On the Way Time</span>    
                      </th>
                      <th style={labelTableSub}>
                          <span style={labelslabel}>End Time</span>    
                      </th>
                      <th style={labelTableSub}>
                          <span style={labelslabel}>Status</span>    
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.donorData.map((dataSumm, key)=>
                    <tr key={key} style={labelBorder}>
                      <td style={labelTableSub}>
                          <span style={labelslabelSpan}>
                              {dataSumm.name}
                          </span>
                      </td>
                      <td style={labelTableSub}>
                          <span style={labelslabelSpan}>
                              {dataSumm.order_start_time}
                          </span>
                      </td>
                      <td style={labelTableSub}>
                          <span style={labelslabelSpan}>
                              {dataSumm.order_way_time}
                          </span>
                      </td>
                      <td style={labelTableSub}>
                          <span style={labelslabelSpan}>
                              {dataSumm.order_end_time}
                          </span>
                      </td>
                      <td style={labelTableSub}>
                          <span style={labelslabelSpan}>
                              {dataSumm.order_assign_status}
                          </span>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </table>
              )}
            </RctCollapsibleCard>
          </>
        )}
      </div>
    );
  }
}
