import React from "react";

import Poll from "../components/Poll";
import * as PollActions from "../actions/PollActions";
import PollStore from "../stores/PollStore.js";

export default class Polls extends React.Component {
	constructor() {
		super();
		this.getPolls = this.getPolls.bind(this);
		this.state = {
			polls: PollStore.getAll()
		};
	}

	componentWillMount() {
		PollStore.on("change", this.getPolls);
	}

	componentWillUnmount() {
		PollStore.removeListener("change", this.getPolls);
	}

	getPolls() {
		this.setState({
			polls: PollStore.getAll()
		})
	}

	createPoll() {
		const pollName = document.getElementById("pollName").value;
		PollActions.createPoll(pollName);
	}

	deletePoll(id) {
		PollActions.deletePoll(id);
	}

	reloadPolls() {
		PollActions.reloadPolls();
	}

	render() {
		const { pollParam } = this.props.params;
		const { polls } = this.state;
		var pollTitle = pollParam ? "(" + pollParam + ")" : "";
		const PollComponents = polls.map((poll) => {
			return <Poll key={poll.id} {...poll} delete={this.deletePoll.bind(this, poll.id)} />;
		})
		return (
			<div>
				<h1>Polls {pollTitle}</h1>
				<button onClick={this.createPoll.bind(this)}>Create Poll</button>
				<input id="pollName" />
				<br/>
				<button onClick={this.reloadPolls.bind(this)}>Reload Polls</button>
				{PollComponents}
			</div>
		);
	}
}