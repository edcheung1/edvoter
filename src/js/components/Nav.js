import React from "react";
import { IndexLink, Link } from "react-router";

import AuthActions from '../actions/AuthActions';
import AuthStore from "../stores/AuthStore.js";

export default class Nav extends React.Component {
	constructor() {
		super();
		this.state = {
			authenticated: AuthStore.isAuthenticated()
		}
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	login() {
		this.props.lock.show((err, profile, token) => {
			if(err) {
				console.error(err);
				return;
			}

			AuthActions.logUserIn(profile, token);
			this.setState({
				authenticated: true
			});
		})
	}

	logout() {
		AuthActions.logUserOut();
		this.setState({
			authenticated: false
		})
	}

	render() {
		const { location } = this.props;
		const homeActive = location.pathname === "/" ? "active" : "";
		const pollsActive = location.pathname.match(/^polls/) ? "active" : "";
		const loginActive = location.pathname.match(/^login/)  ? "active" : "";
		const newPollActive = location.pathname.match(/^settings/)  ? "active" : "";
		return (
			<div>
				<nav class="navbar navbar-default">
				  <div class="container-fluid">
				    <div class="navbar-header">
				      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				        <span class="sr-only">Toggle navigation</span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				      </button>
			      	  <IndexLink class="navbar-brand" to="/">Ed's Voter Redux App</IndexLink>
				    </div>
				    <div class="navbar-collapse collapse" id="bs-example-navbar-collapse-1">
				      <ul class="nav navbar-nav">
				        <li class={homeActive}>
				        	<IndexLink to="/">Home</IndexLink>
			        	</li>
				        <li class={pollsActive}>
				        	<Link to="polls">All Polls</Link>
			        	</li>
			        	<li class={newPollActive}>
				        	<Link to="newpoll">New Poll</Link>
			        	</li>
				        <li class={loginActive}>
				        	{ !this.state.authenticated ? 
				        		(<a style={{cursor: "pointer"}} onClick={this.login}>Login</a>) : (<a style={{cursor: "pointer"}} onClick={this.logout}>Logout</a>)
				        	}
			        	</li>
				      </ul>
				    </div>
				  </div>
				</nav>
			</div>
		);
	}

}