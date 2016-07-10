import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PollStore extends EventEmitter {
	setUser(profile, token) {
		if(!localStorage.getItem('id_token')) {
			localStorage.setItem('profile', JSON.stringify(profile));
			localStorage.setItem('id_token', token);
		}
	}

	removeUser() {
		localStorage.removeItem('profile');
		localStorage.removeItem('id_token');
	}

	isAuthenticated() {
		if(localStorage.getItem('id_token')) {
			return true;
		}
		return false;
	}

	getUser() {
		return localStorage.getItem('profile');
	}

	getJwt() {
		return localStorage.getItem('id_token');
	}

	handleActions(action) {
		switch(action.type) {
			case "USER_LOGIN": {
				this.setUser(action.profile, action.token);
				this.emit("change");
				break;
			}
			case "USER_LOGOUT": {
				this.removeUser();
				this.emit("change");
				break;		
			}
			default:
		}
	}

}

const authStore = new PollStore;
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;