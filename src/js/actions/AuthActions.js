import dispatcher from "../dispatcher";

export default {
	logUserIn: (profile, token) => {
		dispatcher.dispatch({
			type: "USER_LOGIN",
			profile,
			token
		});
	},

	logUserOut: () => {
		dispatcher.dispatch({
			type: "USER_LOGOUT"
		});
	}
}