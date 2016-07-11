import React from "react";
import AuthStore from "../stores/AuthStore";

import * as PieChart from "./PieChart"

export default class Poll extends React.Component {
	constructor() {
		super();
		this.pieProps = {
			width: 275,
			height: 275
		}
	}

	componentDidMount() {
		let el = "#pie-" + this.props._id;
		PieChart.create(el, this.pieProps, this.props.choices);
	}

	componentDidUpdate() {
		let el = "#pie-" + this.props._id;
		PieChart.update(el, this.pieProps, this.props.choices);
		
	}

	componentWillUnmount() {
		let el = "#pie-" + this.props._id;
		PieChart.destroy(el);
	}

	render() {
		let currentUser = AuthStore.getUser() === null ? localStorage.getItem('ip_address') : AuthStore.getUser();
		let hasVoted = this.props.voted_users.indexOf(currentUser) >= 0;
		const PollChoices = this.props.choices.map((choice, i) => {
			return (
				<div key={i}>
					{ hasVoted ? "" : (
						<button class="btn btn-success btn-xs btn-add-vote" onClick={this.props.addVote.bind(this,this.props._id,choice.choice_name, currentUser)}>+</button>
					)
					}
					{choice.choice_name + ": " + choice.votes}
				</div>
			);
		})

		return (
			<div class="col-md-6">
				<div class="poll-container">
					<div class="poll-info">
						<h3>{this.props.title}</h3>
						<h5>{ hasVoted ? "You've already voted in this poll." : ""}</h5>
						{PollChoices}
						{ currentUser == this.props.creator ? (
							<button class="btn btn-danger btn-delete-poll" onClick={this.props.delete}>Delete Poll</button>
						) : ""
						}
					</div>
					<div id={"pie-" + this.props._id} class="pie-chart"/>
				</div>
			</div>
			
		);
	}
}