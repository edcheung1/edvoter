import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
	render() {
		const { location } = this.props;
		console.log(location.pathname);
		const homeActive = location.pathname === "/" ? "active" : "";
		const pollsActive = location.pathname.match(/^polls/) ? "active" : "";
		const loginActive = location.pathname.match(/^login/)  ? "active" : "";
		const settingsActive = location.pathname.match(/^settings/)  ? "active" : "";
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
			      	  <IndexLink class="navbar-brand" to="/">Home</IndexLink>
				    </div>
				    <div class="navbar-collapse collapse" id="bs-example-navbar-collapse-1">
				      <ul class="nav navbar-nav">
				        <li class={homeActive}>
				        	<IndexLink to="/">Home</IndexLink>
			        	</li>
				        <li class={pollsActive}>
				        	<Link to="polls">Polls</Link>
			        	</li>
				        <li class={loginActive}>
				        	<Link to="login">Login</Link>
			        	</li>
				        <li class={settingsActive}>
				        	<Link to="settings">Settings</Link>
			        	</li>
				      </ul>
				    </div>
				  </div>
				</nav>
			</div>
		);
	}

}