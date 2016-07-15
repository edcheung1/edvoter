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
		if(choice !== '') PollActions.addVote(_id, choice, user_id);
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

		// let polls = [
		// 	{
		// 		title: "test poll",
		// 		_id: "test_id1",
		// 		creator: "test creator",
		// 		choices: [
		// 			{choice_name: "squirtle", votes: 43}, 
		// 			{choice_name: "charmander", votes: 12},
		// 			{choice_name: "bulbasaur", votes: 323}
		// 		],
		// 		voted_users: []
		// 	}, 
		// 	{
		// 		title: "test poll",
		// 		_id: "test_id2",
		// 		creator: "test creator",
		// 		choices: [
		// 			{choice_name: "squirtle", votes: 43}, 
		// 			{choice_name: "charmander", votes: 12},
		// 			{choice_name: "bulbasaur", votes: 323}
		// 		],
		// 		voted_users: []
		// 	}, 
		// 	{
		// 		title: "test poll",
		// 		_id: "test_id3",
		// 		creator: "test creator",
		// 		choices: [
		// 			{choice_name: "squirtle", votes: 43}, 
		// 			{choice_name: "charmander", votes: 12},
		// 			{choice_name: "bulbasaur", votes: 323}
		// 		],
		// 		voted_users: []
		// 	}
		// ]

		const PollComponents = polls.map((poll) => {
			return <Poll key={poll._id} {...poll} addVote={this.addVote} addOption={this.addOption} delete={this.deletePoll.bind(this, poll._id)} />;
		});

		return (
			<div>
				<h1>Polls {pollTitle}</h1>
				{PollComponents}
			</div>
		);
	}
}