import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PollStore extends EventEmitter {
	constructor() {
		super();
		this.polls = [
			{
				id: 1,
				name: "Ed",
				value: 8923
			},
			{
				id: 2,
				name: "Linnea",
				value: 3490
			}
		]
	}

	createPoll(name, value = 0) {
		const id = Date.now();

		this.polls.push({
			id,
			name,
			value: id
		});

		this.emit("change");
	}

	deletePoll(removeId) {
		this.polls = this.polls.filter( poll => poll.id !== removeId);

		this.emit("change");
	}

	getAll() {
		return this.polls;
	}

	handleActions(action) {
		switch(action.type) {
			case "CREATE_POLL": {
				this.createPoll(action.name);
				break;
			}
			case "DELETE_POLL": {
				this.deletePoll(action.id);
				break;		
			}
			case "RECEIVE_POLLS": {
				this.polls = action.polls;
				this.emit("change");
				break;
			}

		}
	}

}

const pollStore = new PollStore;
dispatcher.register(pollStore.handleActions.bind(pollStore));
window.dispatcher = dispatcher;

export default pollStore;