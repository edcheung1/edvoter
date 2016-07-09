import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PollStore extends EventEmitter {
	constructor() {
		super();
		this.polls = []
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