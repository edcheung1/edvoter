import React from "react";

export default class Polls extends React.Component {
	render() {
		return (
			<div id="home">
				<h1>Ed's Voting App (Made with React+Flux)</h1>

				<p>
					Visit "All Polls" to vote on any existing poll, or log in to create your own poll! 
					Each poll can only be vote on once, as an authenticated or unauthenticated user. 
					Polls can be deleted by the user who created it.
					<br/><br/>
					This app was made using React and the Flux architecture, utilizing the Component->Actions->Dispatcher->Store model. 
					The database runs on MongoDB and the app is deployed on Heroku. Auth0 is used for authentication.
				</p>
			</div>
			
		);
	}
}