import React, { Component } from "react";
import { Helmet } from "react-helmet";
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {baseURL} from '../../api';
import dateyear from '.././dateyear';
import {
  TotalSalesWidget,
  NetProfitWidget,
	TaxStatsWidget,
	ExpensesWidget,
  RecentOrdersWidget,
  BookingOrderWidget,
  SocialFeedsWidget,
} from "Components/Widgets";
import axios from "axios";

const totalSales = {
  label: 'Pending Booking',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const netProfit = {
  label: 'Confirmed Booking',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const taxStats = {
  label: 'Today Booking',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const expenses = {
  label: 'Tomorrow Booking',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

 export default class NewsDashboard extends Component {
   state = {
     results: [],
   };
   

   componentDidMount() {

    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      
      browserHistory.push("/logout");
      
    }else{

      
    }
     


     axios({
       url: baseURL+"/panel-fetch-dashboard-data/"+dateyear,
       method: "GET",
       headers: {
         Authorization: `Bearer ${localStorage.getItem("login")}`,
       },
     })
       .then((res) => {
         this.setState({ results: res.data });
         localStorage.setItem("booking_pending_count",this.state.results.booking_pending_count);
         localStorage.setItem("booking_Confirmed_count",this.state.results.booking_Confirmed_count);
         localStorage.setItem("vendor_count",this.state.results.vendor_count);
         localStorage.setItem("booking_current_count",this.state.results.booking_current_count);
         localStorage.setItem("booking_tomm_count",this.state.results.booking_tomm_count);
         localStorage.setItem("booking_Inspection_today",this.state.results.booking_Inspection_today);
         localStorage.setItem("booking_Confirmed_today",this.state.results.booking_Confirmed_today);
         localStorage.setItem("booking_Vendor_today",this.state.results.booking_Vendor_today);
         localStorage.setItem("booking_Cancel_today",this.state.results.booking_Cancel_today);
         localStorage.setItem("booking_way_today",this.state.results.booking_way_today);
         localStorage.setItem("booking_Completed_today",this.state.results.booking_Completed_today);
       })
       .catch((res) => {
         alert("Something Went Wrong!");
         
       });
   }

  render() {
    
     return (
       <div className="news-dashboard-wrapper">
         <Helmet>
           <title>V3Care</title>
           <meta name="description" content="V3Care" />
         </Helmet>
         <div className="row">
            <div className="col-sm-3 col-md-3">
                <TotalSalesWidget
                  label={totalSales.label}
                  chartdata={totalSales.chartdata}
                  labels={totalSales.labels}
                  value = {this.state.results.booking_pending_count}
                />
            </div>
            <div className="col-sm-3 col-md-3">
                <NetProfitWidget
                  label={netProfit.label}
                  chartdata={netProfit.chartdata}
                  labels={netProfit.labels}
                  value = {this.state.results.booking_Confirmed_count}
                />
            </div>
            <div className="col-sm-3 col-md-3">
                <TaxStatsWidget
                  label={taxStats.label}
                  chartdata={taxStats.chartdata}
                  labels={taxStats.labels}
                  value = {this.state.results.booking_current_count}
                />
            </div>
            <div className="col-sm-3 col-md-3">
                <ExpensesWidget
                  label={expenses.label}
                  chartdata={expenses.chartdata}
                  labels={expenses.labels}
                  value = {this.state.results.booking_tomm_count}
                />
            </div>
          </div>
          <div className="row" style={{justifyContent:'center', fontSize:'16px'}}>
            <label>Today Jobs</label>
          </div>
          <div className="row">
            <div className="col-sm-2 col-md-2 col-lg-2">
              <div className="social-card" style={{justifyContent:'center',cursor:'default'}}>
                <span style={{width:'100%'}}>
                  <span className="font-weight-bold">{this.state.results.booking_Inspection_today}</span>
                  <span className="fs-14">Inspection</span>
                </span>
              </div>
            </div>
            <div className="col-sm-2 col-md-2 col-lg-2">
              <div className="social-card" style={{justifyContent:'center',cursor:'default'}}>
                <span style={{width:'100%'}}>
                  <span className="font-weight-bold">{this.state.results.booking_Confirmed_today}</span>
                  <span className="fs-14">Confirmed</span>
                </span>
              </div>
            </div>
            <div className="col-sm-2 col-md-2 col-lg-2">
              <div className="social-card" style={{justifyContent:'center',cursor:'default'}}>
                <span style={{width:'100%'}}>
                  <span className="font-weight-bold">{this.state.results.booking_Vendor_today}</span>
                  <span className="fs-14">Vendor</span>
                </span>
              </div>
            </div>
            <div className="col-sm-2 col-md-2 col-lg-2">
              <div className="social-card" style={{justifyContent:'center',cursor:'default'}}>
                <span style={{width:'100%'}}>
                  <span className="font-weight-bold">{this.state.results.booking_way_today}</span>
                  <span className="fs-14">On the Way</span>
                </span>
              </div>
            </div>
            <div className="col-sm-2 col-md-2 col-lg-2">
              <div className="social-card" style={{justifyContent:'center',cursor:'default'}}>
                <span style={{width:'100%'}}>
                  <span className="font-weight-bold">{this.state.results.booking_Progress_today}</span>
                  <span className="fs-14">In Progress</span>
                </span>
              </div>
            </div>
            
            <div className="col-sm-2 col-md-2 col-lg-2">
              <div className="social-card" style={{justifyContent:'center',cursor:'default'}}>
                <span style={{width:'100%'}}>
                  <span className="font-weight-bold">{this.state.results.booking_Completed_today}</span>
                  <span className="fs-14">Completed</span>
                </span>
              </div>
            </div>
          </div>
          
          <RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-lg-12 w-xs-full"
						heading={<IntlMessages id="Tomorrow Booking Orders" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<BookingOrderWidget />
					</RctCollapsibleCard>
        </div>
     );
   }
 }
 