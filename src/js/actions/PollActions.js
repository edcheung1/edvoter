import dispatcher from "../dispatcher";
import axios from "axios";

export function createPoll(title, choices, _id) {
	axios.post('/api/allpolls', {
			title,
			choices,
			_id
		})
		.then((res) => {
			this.reloadPolls();
		})
		.catch((err) => {
			console.error(err);
		})
	
}

export function deletePoll(id) {
	axios.delete('/api/allpolls/' + id)
		.then((res) => {
			this.reloadPolls();
		})
		.catch((err) => {
			console.error(err);
		})
}

export function reloadPolls() {
	dispatcher.dispatch({
		type: "FETCH_POLLS"
	});

	console.log("fetching");
	axios.get('/api/allpolls')
		.then((res) => {
			dispatcher.dispatch({
				type: "RECEIVE_POLLS",
				polls: res.data
			})
		})
		.catch((err) => {
			console.error(err);
		});
}

export function addVote(_id, choice) {
	axios.post('/api/allpolls/' + _id, {
			_id,
			choice
		})
		.then((res) => {
			this.reloadPolls();
		})
		.catch((err) => {
			console.error(err);
		})
}