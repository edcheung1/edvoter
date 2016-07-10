import React, { PropTypes as T } from "react";

import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			authenticated: AuthStore.isAuthenticated()
		};
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	login() {
		this.props.lock.show((err, profile, token) => {
			if(err) {
				alert(err);
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
		return (
			<div>
				<h1>Login</h1>
				{ !this.state.authenticated ? (
					<button class="btn btn-primary" onClick={this.login}>Login</button>
				) : (
					<button class="btn btn-danger" onClick={this.logout}>Logout</button>
				)}
			</div>
		);
	}
}