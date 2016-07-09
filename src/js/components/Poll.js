import React from "react";

export default class Poll extends React.Component {

	render() {
		return (
			<div>
				<h3>{this.props.name}</h3>
				<h4>{this.props.value}</h4>
				<button class="btn btn-danger" onClick={this.props.delete}>Delete Poll</button>
			</div>
		);
	}
}