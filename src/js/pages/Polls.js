import React from "react";

import Poll from "../components/Poll";
import * as PollActions from "../actions/PollActions";
import PollStore from "../stores/PollStore.js";
import AuthStore from "../stores/AuthStore.js";

export default class Polls extends React.Component {
	constructor() {
		super();
		this.getPolls = this.getPolls.bind(this);
		this.getAuthenticated = this.getAuthenticated.bind(this);
		this.state = {
			authenticated: AuthStore.isAuthenticated(),
			polls: PollStore.getAll()
		};
	}

	componentWillMount() {
		PollActions.reloadPolls();
		PollStore.on("change", this.getPolls);
		AuthStore.on("change", this.getAuthenticated);
	}

	componentWillUnmount() {
		PollStore.removeListener("change", this.getPolls);
		AuthStore.removeListener("change", this.getAuthenticated);
	}

	getPolls() {
		this.setState({
			polls: PollStore.getAll()
		});
	}

	getAuthenticated() {
		this.setState({
			authenticated: AuthStore.isAuthenticated()
		})
	}

	addVote(_id, choice) {
		PollActions.addVote(_id, choice);
	}

	deletePoll(_id) {
		PollActions.deletePoll(_id);
	}

	reloadPolls() {
		PollActions.reloadPolls();
	}

	render() {
		const { pollParam } = this.props.params;
		const { polls } = this.state;
		let pollTitle = pollParam ? "(" + pollParam + ")" : "";
		const PollComponents = polls.map((poll) => {
			return <Poll key={poll._id} {...poll} addVote={this.addVote} delete={this.deletePoll.bind(this, poll._id)} />;
		});

		return (
			<div>
				<h1>Polls {pollTitle}</h1>
				<br/>
				{ this.state.authenticated ? "Logged In!" : "Not Logged In!"}
				<br/>
				<button class="btn btn-primary" onClick={this.reloadPolls.bind(this)}>Reload Polls</button>
				{PollComponents}
			</div>
		);
	}
}