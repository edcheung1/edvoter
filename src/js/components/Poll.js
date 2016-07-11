import React from "react";
import AuthStore from "../stores/AuthStore"

export default class Poll extends React.Component {

	render() {
		let currentUser = AuthStore.getUser() === null ? localStorage.getItem('ip_address') : AuthStore.getUser();
		let hasVoted = this.props.voted_users.indexOf(currentUser) >= 0;
		const PollChoices = this.props.choices.map((choice, i) => {
			return (
				<div key={i}>
					{choice.choice_name + ": " + choice.votes}
					{ hasVoted ? "" : (
						<button class="btn btn-success btn-xs" onClick={this.props.addVote.bind(this,this.props._id,choice.choice_name, currentUser)}>+</button>
					)
					}
				</div>
			);
		})

		return (
			<div class="poll-container">
				<h3>{this.props.title}</h3>
				<h5>{ hasVoted ? "You've already voted in this poll." : ""}</h5>
				{PollChoices}
				{ currentUser == this.props.creator ? (
					<button class="btn btn-danger" onClick={this.props.delete}>Delete Poll</button>
				) : ""
				}
				
			</div>
		);
	}
}