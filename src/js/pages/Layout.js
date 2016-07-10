import React, {PropTypes as T} from "react";
import { Link } from "react-router";
import Auth0Lock from 'auth0-lock';

import Footer from "../components/Footer";
import Nav from "../components/Nav";
import AuthStore from "../stores/AuthStore.js";

export default class Layout extends React.Component {
	constructor() {
		super();
		this.getAuthenticated = this.getAuthenticated.bind(this);
		this.state = {
			authenticated: AuthStore.isAuthenticated()
		}
	}

	componentWillMount() {
		this.lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {});
		AuthStore.on("change", this.getAuthenticated);
	}

	componentWillUnmount() {
		AuthStore.removeListener("change", this.getAuthenticated);
	}

	getAuthenticated() {
		this.setState({
			authenticated: AuthStore.isAuthenticated()
		})
	}

	render() {
		let children = null;

		//Pass lock and authentication onto children
		if(this.props.children) {
			children = React.cloneElement(this.props.children, {
				lock: this.lock,
				authenticated: this.state.authenticated
			})
		}

		return (
			<div>
				<Nav lock={this.lock} authenticated={this.state.authenticated} location={this.props.location} history={this.props.history} />
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