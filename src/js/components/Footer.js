import React from "react";

export default class Footer extends React.Component {
	render() {
		return (
			<footer class="footer">
				<div class="container">
					This Voting App is built by Ed Cheung for FreeCodeCamp.<br/>
					Please see user stories <a href="https://www.freecodecamp.com/challenges/build-a-voting-app">here</a>.<br/>
					Github repository: <a href="https://github.com/edcheung1/edvoter">edcheung1/edvoter</a>
				</div>
			</footer>
		);
	}

}