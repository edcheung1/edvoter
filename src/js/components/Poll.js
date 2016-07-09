import React from "react";

export default class Poll extends React.Component {

	render() {
		const PollChoices = this.props.choices.map((choice, i) => {
			return (
				<div key={i}>
					{choice.choice_name + ": " + choice.votes}
					<button class="btn btn-success btn-xs" onClick={this.props.addVote.bind(this,this.props._id,choice.choice_name)}>+</button>
				</div>
			);
		})

		return (
			<div>
				<h3>{this.props.title}</h3>
				{PollChoices}
				<button class="btn btn-danger" onClick={this.props.delete}>Delete Poll</button>
			</div>
		);
	}
}