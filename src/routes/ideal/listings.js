import React, { useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';
import useEscapeKey from "../escape/useEscapeKey";

const Add = (props) => {

    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var todayback = yyyy + "-" + mm + "-" + dd;

    const [idealData, setIdealData] = useState([]);

    const [idealDataDate, setIdealDataDate] = useState({
        from_date: todayback,
    });

    const fetchData = async () =>{
        try{
            let data = {
                from_date: idealDataDate.from_date,
            };
            axios({
                url: baseURL+"/panel-fetch-ideal-field",
                method: "Post",
                data,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                setIdealData(res.data.stock);
                
    
              });
        }catch (error) {
            console.error('Error fetching data:', error);
          }
    };

   

    const onInputChange = (e) => {
      
        setIdealDataDate({
          ...idealDataDate,
          [e.target.name]: e.target.value,
        });  
      
        
    };

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{
            fetchData();
        }
        
    },[idealDataDate.from_date]);

    

    useEscapeKey();

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Ideal Field List" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
              <TextField
                fullWidth
                required
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                autoComplete="Name"
                name="from_date"
                value={idealDataDate.from_date}
                onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            
          </div>

          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
      <div className="row">
      {idealData.map((idealDatadata, key) => (
            <div className="col-sm-2 col-md-2 col-lg-2" key={key}>
              <div className="social-card" style={{justifyContent:'center',cursor:'default',backgroundColor:idealDatadata.o_id == '0' ? 'rgb(236, 233, 233)' : '#97ea97', color:'#000', padding:'.25rem .25rem'}}>
                <span style={{width:'100%'}}>
                  <span className="" style={{fontSize:'0.8rem'}}>{idealDatadata.name}</span>
                  <span className="" style={{fontSize:'0.8rem'}}>{idealDatadata.branch_name}</span>
                </span>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Add;
