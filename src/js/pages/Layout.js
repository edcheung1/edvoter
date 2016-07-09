import React from "react";
import { Link } from "react-router";

import Footer from "../components/Footer";
import Nav from "../components/Nav";

export default class Layout extends React.Component {

	render() {
		return (
			<div>
				<Nav location={this.props.location}/>
				{this.props.children}
				<Link to="/" class="btn btn-primary">Home</Link>
				<Link to="polls/" class="btn btn-warning">Polls</Link>
				<Link to="login" class="btn btn-info">Login</Link>
				<Link to="settings" class="btn btn-success">Settings</Link>
				<Footer />
			</div>	
		);
	}

}