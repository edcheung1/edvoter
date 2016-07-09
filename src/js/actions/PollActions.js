import dispatcher from "../dispatcher";

export function createPoll(name) {
	dispatcher.dispatch({
		type: "CREATE_POLL",
		name
	});
}

export function deletePoll(id) {
	dispatcher.dispatch({
		type: "DELETE_POLL",
		id
	});
}

export function reloadPolls() {
	dispatcher.dispatch({
		type: "FETCH_POLLS"
	});
	setTimeout(() => {
		dispatcher.dispatch({
			type: "RECEIVE_POLLS",
			polls: [
				{
					id: 123214,
					name: "derp",
					value: 19472389
				},
				{
					id: 45435,
					name: "herp",
					value: 534534
				}
			]});
	}, 1000);
}