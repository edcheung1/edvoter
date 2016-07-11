import React from "react";

import Poll from "../components/Poll";
import * as PollActions from "../actions/PollActions";
import PollStore from "../stores/PollStore";
import AuthStore from "../stores/AuthStore";

export default class Polls extends React.Component {
	constructor() {
		super();
		this.getPolls = this.getPolls.bind(this);
		this.state = {
			polls: PollStore.getAll()
		};
	}

	componentWillMount() {
		PollActions.reloadPolls();
		PollStore.on("change", this.getPolls);
	}

	componentWillUnmount() {
		PollStore.removeListener("change", this.getPolls);
	}

	getPolls() {
		this.setState({
			polls: PollStore.getAll()
		});
	}

	addVote(_id, choice, user_id) {
		PollActions.addVote(_id, choice, user_id);
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
				{PollComponents}
			</div>
		);
	}
}