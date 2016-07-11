import React, {PropTypes as T} from "react";
import { Link } from "react-router";
import Auth0Lock from 'auth0-lock';
import axios from "axios";

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
		axios.get('https://freegeoip.net/json/')
			.then((res) => {
				localStorage.setItem('ip_address', res.data.ip);
			})
			.catch((err) => {
				console.log(err);
			})

	}

	componentWillUnmount() {
		AuthStore.removeListener("change", this.getAuthenticated);
		localStorage.removeItem('ip_address', res.data.ip);
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
				lock: this.lock
			})
		}

		let profile = JSON.parse(localStorage.getItem('profile'));
		let welcomeMessage = "";
		if(AuthStore.isAuthenticated()) {
			switch(profile.identities[0].provider) {
				case "facebook":
				case "auth0": {
					welcomeMessage = (<h1>Welcome, {profile.nickname}!</h1>);
					break;
				}
				case "github": {
					welcomeMessage = (<h1>Welcome, {profile.name}!</h1>)
					break;
				}
				default: 
			}
		}

		return (
			<div id="react-body">
				<Nav lock={this.lock} authenticated={this.state.authenticated} location={this.props.location} history={this.props.history} />
				<div class="content container">
				{welcomeMessage}
				{children}
					<Link to="/" class="btn btn-primary">Home</Link>
					<Link to="polls" class="btn btn-warning">Polls</Link>
					<Link to="mypolls" class="btn btn-info">My Polls</Link>
					<Link to="newpoll" class="btn btn-success">New Poll</Link>
					<br/>
				</div>
				<Footer />
			</div>	
		);
	}

}