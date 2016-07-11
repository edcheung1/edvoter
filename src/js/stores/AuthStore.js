import { EventEmitter } from "events";
import jwt_decode from "jwt-decode";

import dispatcher from "../dispatcher";

class AuthStore extends EventEmitter {
	setUser(profile, token) {
		if(!localStorage.getItem('id_token')) {
			let decodedJwt = jwt_decode(token);

			localStorage.setItem('profile', JSON.stringify(profile));
			localStorage.setItem('id_token', token);
			localStorage.setItem('user_id', decodedJwt.sub);

		}
	}

	removeUser() {
		localStorage.removeItem('profile');
		localStorage.removeItem('id_token');
		localStorage.removeItem('user_id');
	}

	isAuthenticated() {
		if(localStorage.getItem('id_token')) {
			return true;
		}
		return false;
	}

	getUser() {
		return localStorage.getItem('user_id');
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

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;