import React, { Component } from 'react';
import {baseURL} from '../../api';
import axios from "axios";
import dateyear from '../../routes/dateyear';
import Moment from 'moment';

class RecentOrders extends Component {

	state = {
		recentOrders: null
	}

	componentDidMount() {
		this.getRecentOrders();
	}
	getRecentOrders() {

		axios({
			url: baseURL+"/panel-fetch-dashboard-data/"+dateyear,
			method: "GET",
			headers: {
			  Authorization: `Bearer ${localStorage.getItem("login")}`,
			},
		  })
			.then((res) => {
			  this.setState({ recentOrders: res.data.booking_latest });
			})
			.catch((res) => {
			  alert("Something Went Wrong!");
			  
			});
	}

	render() {
		const { recentOrders } = this.state;
		return (
			<div className="table-responsive">
				<table className="table table-hover mb-0">
					<thead>
						<tr>
							<th>ID</th>
							<th>Branch</th>
							<th>Customer</th>
							<th>Mobile</th>
							<th>Booking Date</th>
							<th>Service Date</th>
							<th>Service</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{recentOrders && recentOrders.map((order, key) => (
							<tr key={key}>
								<td>{order.order_ref}</td>
								<td>{order.branch_name}</td>
								<td>
									<span className="d-block fw-normal">{order.order_customer}</span>
								</td>
								<td>{order.order_customer_mobile}</td>
								<td>{ Moment(order.order_date).format('DD-MM-YYYY')}</td>
								<td>{Moment(order.order_service_date).format('DD-MM-YYYY')}</td>
								<td>{(order.order_custom_price <= '1' ? order.order_service : order.order_custom)}</td>
								<td>{order.order_status}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default RecentOrders;
