import React, {PropTypes as T} from "react";
import { Link } from "react-router";
import Auth0Lock from 'auth0-lock';

import Footer from "../components/Footer";
import Nav from "../components/Nav";

export default class Layout extends React.Component {

	componentWillMount() {
		this.lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {});
	}

	render() {
		let children = null;

		//Pass lock onto children
		if(this.props.children) {
			children = React.cloneElement(this.props.children, {
				lock: this.lock
			})
		}

		return (
			<div>
				<Nav lock={this.lock} location={this.props.location}/>
				{children}
				<Link to="/" class="btn btn-primary">Home</Link>
				<Link to="polls" class="btn btn-warning">Polls</Link>
				<Link to="login" class="btn btn-info">Login</Link>
				<Link to="newpoll" class="btn btn-success">New Poll</Link>
				<Footer />
			</div>	
		);
	}

}