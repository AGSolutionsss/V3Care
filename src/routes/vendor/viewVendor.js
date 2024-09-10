import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import useEscapeKey from "../escape/useEscapeKey";

const labelslabel = {
    
    fontSize: '16px',
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
    fontSize: '16px',
    paddingTop:'5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
}

const labelTable1 = {
    width:'30%'
}

const labelTableSub = {
    width:'25%',
    border: '1px solid black',
}

const labelTable2 = {
    width:'7%',
    textAlign: 'center',
    border: '1px solid black',
}

const labelTable3 = {
    width:'63%'
}

const labelBorder = {
    paddingTop:'5px',
    border:'1px solid #4d4b4b',
}

export default function Invoice(props) {
    let history = useHistory();
  const componentRef = useRef();
  const [vendor, setVendor] = useState({});
  const [vendorService, setVendorService] = useState({});
  const [vendorBranch, setVendorBranch] = useState({});
  const [vendorArea, setVendorArea] = useState({});
  const [loader, setLoader]= useState(true);
  
    useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    axios({
      url: baseURL+"/panel-fetch-vendor-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setVendor(res.data.vendor);
      setVendorService(res.data.vendorService);
      setVendorBranch(res.data.vendorbranch);
      setVendorArea(res.data.vendorArea);
      setLoader(false)
      
    });
  }, []);

  useEscapeKey();
 
return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
        <div className="invoice-wrapper">
            <PageTitleBar title="View" match={props.match} />
            <div className="row">
                <div className="col-sm-12 col-md-12 col-xl-12 mx-auto" style={{width:'auto'}}>
                    <RctCard>
                        <div className="invoice-head text-right">
                            <ul className="list-inline">
                                
                                <li>
                                    <ReactToPrint
                                    trigger={() => (
                                        <a>
                                        <i className="mr-10 ti-printer"></i> Print
                                        </a>
                                    )}
                                    content={() => componentRef.current}
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="p-10" ref={componentRef} style={{margin: '5px'}}>
                            <div className="d-flex pb-10 pl-30" style={{justifyContent:'flex-start'}}>
                                <div className="address text-center">
                                    <h1>{vendor.vendor_company} ( {vendor.vendor_short} ) - {vendor.vendor_status}</h1>
                                </div>
                            </div>
                            <div className="table-responsive" style={{padding:'20px'}}>
                                <div className="row">
                                    <div className="col-md-6 col-6">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Mobile</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vendor.vendor_mobile}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Email</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vendor.vendor_email}
                                                    </span>
                                                </th>
                                            </tr> 
                                        </table>    
                                    </div>
                                    <div className="col-md-6 col-6">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Aadhar No</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vendor.vendor_aadhar_no}
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>GST No</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vendor.vendor_gst_no}
                                                    </span>
                                                </th>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-12 col-12">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTableSub}>
                                                    <span style={labelslabel}>Area</span>    
                                                </th>    
                                            </tr>
                                            {vendorArea.map((vendorArea)=>(
                                            <tr style={labelBorder}>
                                                <th style={labelTableSub}>
                                                    <span style={labelslabelSpan}>
                                                        {vendorArea.vendor_area}
                                                    </span>
                                                </th>
                                            </tr>
                                            ))}
                                        </table>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-12 col-12">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTableSub}>
                                                    <span style={labelslabel}>Services</span>    
                                                </th>    
                                            </tr>
                                            {vendorService.map((vendorService)=>(
                                            <tr style={labelBorder}>
                                                <th style={labelTableSub}>
                                                    <span style={labelslabelSpan}>
                                                        {vendorService.vendor_service}
                                                    </span>
                                                </th>
                                            </tr>
                                            ))}
                                        </table>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-md-12 col-12">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTableSub}>
                                                    <span style={labelslabel}>Address</span>    
                                                </th>    
                                            </tr>
                                            {vendorBranch.map((vendorBranch)=>(
                                            <tr style={labelBorder}>
                                                <th style={labelTableSub}>
                                                    <span style={labelslabelSpan}>
                                                        {vendorBranch.vendor_branch_flat} {", "} {vendorBranch.vendor_branch_building} {", "}  {vendorBranch.vendor_branch_landmark} {", "} 
                                                        {vendorBranch.vendor_branch_location} {", "}  {vendorBranch.vendor_branch_city} {"- "}  {vendorBranch.vendor_branch_district} {", "} 
                                                        {vendorBranch.vendor_branch_state} {"- "} {vendorBranch.vendor_branch_pincode}
                                                    </span>
                                                </th>
                                            </tr>
                                            ))}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RctCard>
                </div>
            </div>
        </div>
      </>}
    </div>
  );
}