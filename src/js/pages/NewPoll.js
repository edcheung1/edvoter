import React from "react";
import Hashids from "hashids";

import * as PollActions from "../actions/PollActions";
import AuthActions from '../actions/AuthActions';
import AuthStore from "../stores/AuthStore.js";

export default class NewPoll extends React.Component {
	constructor() {
		super();
		this.login = this.login.bind(this);
	}

	login() {
		this.props.lock.show((err, profile, token) => {
			if(err) {
				alert(err);
				return;
			}
			AuthActions.logUserIn(profile, token);
		})
	}

	createPoll() {
		const hashids = new Hashids("herp derp", 8);
		const pollTitle = document.getElementById("pollTitle").value;
		const pollChoices = document.getElementById("pollChoices").value.split('\n').map((choice) => {
			let rObj = {};
			rObj["choice_name"] = choice;
			rObj["votes"] = 0;
			return rObj;
		});
		let pollId = hashids.encode(Date.now());
		PollActions.createPoll(pollTitle, pollChoices, pollId);

		//Redirect to all polls
		this.props.history.push('/polls');
	}

	render() {
		const defaultChoices = "Apples\nOranges\nBananas";
		return (
			<div>
				<h1>New Poll</h1>
				{ !this.props.authenticated ? (
					<div>
						<h4>Please log in or sign up in order to create a new poll!</h4>
						<button class="btn btn-primary" onClick={this.login}>Login</button>
					</div>
				) : (
					<div>
						<h4>Poll Title:</h4>
						<input id="pollTitle" defaultValue="Enter Title Here."></input>
						<h4>Poll Choices (Separate with Line Breaks):</h4>
						<textarea id="pollChoices" rows="5" cols="60" defaultValue={defaultChoices}></textarea>

						<br/>
						<button onClick={this.createPoll.bind(this)} class="btn btn-danger">Create Poll!</button>
					</div>
				)}
				
			</div>
		);
	}
}